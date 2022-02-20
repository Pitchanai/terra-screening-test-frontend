import { DraggableProvided } from 'react-beautiful-dnd'
import { Box, Typography } from '@mui/material'

import { dialogStore } from 'stores/dialogStore'

import type { TaskData } from 'types/types'

export type Props = {
  task: TaskData
  provided: DraggableProvided
}

export const TaskCard = ({ task, provided }) => {
  return (
    <Box
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => {
        dialogStore.open(() => <Box>Hello Jaa</Box>)
      }}
    >
      <Typography>{task.name}</Typography>
      <Typography variant="body2">{task.description}</Typography>
    </Box>
  )
}
