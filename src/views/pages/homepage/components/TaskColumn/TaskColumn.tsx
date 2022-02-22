import { Droppable, Draggable, type DroppableProvided, type DraggableProvided } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import { Box, Button, Typography } from '@mui/material'

import { taskStore } from 'stores/taskStore'

import type { TaskData } from 'types/types'

import { TaskCard } from 'views/pages/homepage/components/TaskCard/TaskCard'
import { TaskDialog, type OnConfirmProps } from 'views/pages/homepage/components/TaskDialog/TaskDialog'

import { Root } from './TaskColumn.components'

export type Props = {
  columnId: string
  tasks: TaskData[]
}

export const TaskColumn = observer(({ columnId, tasks }: Props) => {
  const handleCreateTask = ({ name, description, isOpen }: OnConfirmProps) => {
    taskStore.createNewTask(name, description, isOpen, columnId)
  }

  return (
    <Droppable droppableId={columnId}>
      {(provided: DroppableProvided) => (
        <Root {...provided.droppableProps} ref={provided.innerRef}>
          <Box>
            <Typography>Name: {taskStore.columns[columnId]?.label}</Typography>
            <Button onClick={() => TaskDialog({ onConfirm: handleCreateTask })}>Create task</Button>
          </Box>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided: DraggableProvided) => (
                <TaskCard provided={provided} task={task} taskIndex={index} columnId={columnId} />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Root>
      )}
    </Droppable>
  )
})
