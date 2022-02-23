import { Box, Button, TextField, Typography } from '@mui/material'
import { useState, type KeyboardEvent } from 'react'

import { dialogStore } from 'stores/dialogStore'

import { Root, Title, Content } from './NameDialog.components'

export type Props = {
  topic: string
  defaultValue?: string
  onConfirm: (value: string) => void
}

export const NameDialog = ({ topic, defaultValue, onConfirm }: Props) => {
  dialogStore.open(() => {
    const [name, setName] = useState(defaultValue ?? '')
    const [filled, setFilled] = useState(false)

    const onConfirmCreate = () => {
      if (!name) return

      dialogStore.close()
      onConfirm(name)
    }

    const handleNameChange = (value: string) => {
      if (!filled) setFilled(true)
      setName(value)
    }

    const handleOnKeyPress = ({ key }: KeyboardEvent<HTMLDivElement>) => {
      if (key === 'Enter') onConfirmCreate()
    }

    return (
      <Root>
        <Title height="44">
          <Typography variant="h6">{topic}</Typography>
        </Title>
        <Content>
          <TextField
            type="text"
            label="Name"
            helperText="required"
            fullWidth
            autoFocus
            error={!name && filled}
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onKeyPress={handleOnKeyPress}
          />
          <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end' }}>
            <Button disabled={!name} onClick={onConfirmCreate} variant="contained">
              Confirm
            </Button>
          </Box>
        </Content>
      </Root>
    )
  })
}
