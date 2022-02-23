import { DraggableProvided } from 'react-beautiful-dnd'
import { Typography, Chip } from '@mui/material'

import { taskStore } from 'stores/taskStore'

import { TaskDialog, type OnConfirmProps } from 'views/pages/homepage/components/TaskDialog/TaskDialog'

import type { TaskData } from 'types/types'

import { Root, TitleContainer } from './TaskCard.components'

export type Props = {
  task: TaskData
  taskIndex: number
  columnId: string
  provided: DraggableProvided
  isDragging: boolean
}

export const TaskCard = ({ task, taskIndex, columnId, provided, isDragging }: Props) => {
  const handleEditTask = ({ name, description, isOpen }: OnConfirmProps) => {
    taskStore.editTask(name, description, isOpen, columnId, taskIndex, task.id)
  }

  const handleArchiveTask = () => {
    taskStore.archiveTask(columnId, task.id, taskIndex)
  }

  return (
    <Root
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => TaskDialog({ task, onConfirm: handleEditTask, onArchive: handleArchiveTask })}
      isDragging={isDragging}
    >
      <TitleContainer>
        <Typography>{task.name}</Typography>
        <Chip label={task.status} color={task.status === 'open' ? 'success' : 'error'} size="small" />
      </TitleContainer>

      <Typography variant="body2" color="textSecondary">
        {task.description}
      </Typography>
    </Root>
  )
}
