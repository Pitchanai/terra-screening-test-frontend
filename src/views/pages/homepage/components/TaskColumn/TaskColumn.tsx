import { Droppable, Draggable, type DroppableProvided, type DraggableProvided } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'

import { taskStore } from 'stores/taskStore'

import type { TaskData } from 'types/types'

import { TaskCard } from 'views/pages/homepage/components/TaskCard/TaskCard'
import { TaskDialog, type OnConfirmProps } from 'views/pages/homepage/components/TaskDialog/TaskDialog'
import { CreateNewDialog } from 'views/pages/homepage/components/CreateNewDialog/CreateNewDialog'

import { Root, TaskContainer, TitleContainer } from './TaskColumn.components'

export type Props = {
  columnType?: 'create' | 'default'
  columnId: string
  columnIndex: number
  currentBoardId: string
}

export const TaskColumn = observer(({ columnType = 'default', columnId, columnIndex, currentBoardId }: Props) => {
  const tasks: TaskData[] = useMemo(() => {
    return taskStore.columns[columnId]?.tasks ?? []
  }, [taskStore.columns, columnId])

  const handleCreateTask = ({ name, description, isOpen }: OnConfirmProps) => {
    taskStore.createNewTask(name, description, isOpen, columnId)
  }

  const handleCreateNewColumn = (name: string) => {
    if (!currentBoardId) return
    taskStore.createNewColumn(name, currentBoardId)
  }

  return columnType === 'create' ? (
    <Root>
      <Typography>Create new column</Typography>
      <Button onClick={() => CreateNewDialog({ type: 'column', onConfirm: handleCreateNewColumn })}>Create</Button>
    </Root>
  ) : (
    <Draggable draggableId={columnId} index={columnIndex}>
      {(provided: DraggableProvided) => (
        <Root ref={provided.innerRef} {...provided.draggableProps}>
          <TitleContainer {...provided.dragHandleProps}>
            <Typography>Name: {taskStore.columns[columnId]?.label}</Typography>
            <Button onClick={() => TaskDialog({ onConfirm: handleCreateTask })}>Create task</Button>
          </TitleContainer>

          <Droppable droppableId={columnId} type="task">
            {(provided: DroppableProvided) => (
              <TaskContainer {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided: DraggableProvided) => (
                      <TaskCard provided={provided} task={task} taskIndex={index} columnId={columnId} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TaskContainer>
            )}
          </Droppable>
        </Root>
      )}
    </Draggable>
  )
})
