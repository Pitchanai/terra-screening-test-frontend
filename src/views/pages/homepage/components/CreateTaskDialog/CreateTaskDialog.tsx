import { Box, Button, TextField, Typography, Switch } from '@mui/material'
import { useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

export type OnConfirmProps = {
  name: string
  description: string
  isOpen: boolean
}

export type Props = {
  onConfirm: (value: OnConfirmProps) => void
}

export const CreateTaskDialog = ({ onConfirm }: Props) => {
  dialogStore.open(() => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isOpen, setIsOpen] = useState(true)

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
