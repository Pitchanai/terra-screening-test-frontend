import { Droppable, Draggable, type DroppableProvided, type DraggableProvided } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import { Box, Button, Typography } from '@mui/material'

import type { TaskData } from 'types/types'

import { TaskCard } from 'views/pages/homepage/components/TaskCard/TaskCard'
import {
  CreateTaskDialog,
  type OnConfirmProps,
} from 'views/pages/homepage/components/CreateTaskDialog/CreateTaskDialog'

import { Root } from './TaskColumn.components'
import { taskStore } from 'stores/taskStore'

export type Props = {
  columnId: string
  tasks: TaskData[]
}

export const TaskColumn = observer(({ columnId, tasks }: Props) => {
  const handleCreateTask = ({ name, description, isOpen }: OnConfirmProps) => {
    taskStore.createNewTask(name, description, isOpen, columnId)
  }

  console.log(taskStore.columns)

  return (
    <Droppable droppableId={columnId}>
      {(provided: DroppableProvided) => (
        <Root {...provided.droppableProps} ref={provided.innerRef}>
          <Box>
            <Typography>Name: {taskStore.columns[columnId]?.label}</Typography>
            <Button onClick={() => CreateTaskDialog({ onConfirm: handleCreateTask })}>Create task</Button>
          </Box>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided: DraggableProvided) => <TaskCard provided={provided} task={task} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </Root>
      )}
    </Droppable>
  )
})
