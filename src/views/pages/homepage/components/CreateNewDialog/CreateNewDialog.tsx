import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

export type Props = {
  type: 'board' | 'column'
  onConfirm: (value: string) => void
}

export const CreateNewDialog = ({ type, onConfirm }: Props) => {
  dialogStore.open(() => {
    const [name, setName] = useState('')

    const onConfirmCreate = () => {
      dialogStore.close()
      onConfirm(name)
    }

    return (
      <Box>
        <Typography>Create new {type}</Typography>
        <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Button disabled={!name} onClick={onConfirmCreate}>
          Confirm
        </Button>
      </Box>
    )
  })
}
