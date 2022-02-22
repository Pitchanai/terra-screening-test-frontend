import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

export type Props = {
  topic: string
  defaultValue?: string
  onConfirm: (value: string) => void
}

export const NameDialog = ({ topic, defaultValue, onConfirm }: Props) => {
  dialogStore.open(() => {
    const [name, setName] = useState(defaultValue ?? '')

    const onConfirmCreate = () => {
      dialogStore.close()
      onConfirm(name)
    }

    return (
      <Box>
        <Typography>{topic}</Typography>
        <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Button disabled={!name} onClick={onConfirmCreate}>
          Confirm
        </Button>
      </Box>
    )
  })
}
