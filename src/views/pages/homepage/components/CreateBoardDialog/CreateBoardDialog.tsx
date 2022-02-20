import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

export type Props = {
  onConfirm: (value: string) => void
}

export const CreateNewBoardDialog = ({ onConfirm }: Props) => {
  dialogStore.open(() => {
    const [boardName, setBoardName] = useState('')

    const onConfirmCreate = () => {
      dialogStore.close()
      onConfirm(boardName)
    }

    return (
      <Box>
        <Typography>Create New Board</Typography>
        <TextField type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
        <Button disabled={!boardName} onClick={onConfirmCreate}>
          Confirm
        </Button>
      </Box>
    )
  })
}
