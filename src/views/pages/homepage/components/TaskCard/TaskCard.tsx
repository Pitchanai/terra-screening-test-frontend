import { DraggableProvided } from 'react-beautiful-dnd'
import { Box, Typography } from '@mui/material'

import { taskStore } from 'stores/taskStore'

import { TaskDialog, type OnConfirmProps } from 'views/pages/homepage/components/TaskDialog/TaskDialog'

import type { TaskData } from 'types/types'

export type Props = {
  task: TaskData
  taskIndex: number
  columnId: string
  provided: DraggableProvided
}

export const TaskCard = ({ task, taskIndex, columnId, provided }: Props) => {
  const handleEditTask = ({ name, description, isOpen }: OnConfirmProps) => {
    taskStore.editTask(name, description, isOpen, columnId, taskIndex, task.id)
  }

  const handleArchiveTask = () => {
    taskStore.archiveTask(columnId, task.id, taskIndex)
  }

  return (
    <Box
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => TaskDialog({ task, onConfirm: handleEditTask, onArchive: handleArchiveTask })}
    >
      <Typography>{task.name}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <Typography color={task.status === 'open' ? 'green' : 'red'}>{task.status}</Typography>
    </Box>
  )
}
