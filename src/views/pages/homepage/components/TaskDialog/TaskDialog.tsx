import { Box, Button, TextField, Typography, Switch } from '@mui/material'
import { useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

import type { TaskData } from 'types/types'

export type OnConfirmProps = {
  name: string
  description: string
  isOpen: boolean
}

export type Props = {
  task?: TaskData
  onConfirm: (value: OnConfirmProps) => void
}

export const TaskDialog = ({ task, onConfirm }: Props) => {
  dialogStore.open(() => {
    const [name, setName] = useState(task?.name ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [isOpen, setIsOpen] = useState(task?.status === 'closed' ? false : true) // If task === undefined, isOpen will be true

    const onConfirmCreate = () => {
      dialogStore.close()
      onConfirm({ name, description, isOpen })
    }

    return (
      <Box>
        <Typography>Create new task</Typography>
        <TextField
          type="text"
          value={name}
          label={<Typography>Name</Typography>}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          value={description}
          label={<Typography>Description</Typography>}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Switch checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
        <Button disabled={!name} onClick={onConfirmCreate}>
          Confirm
        </Button>
      </Box>
    )
  })
}
