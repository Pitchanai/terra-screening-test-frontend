import { Button, TextField, Typography, Switch, Chip } from '@mui/material'
import { useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

import type { TaskData } from 'types/types'

import { Root, Title, Content, ButtonContainer, StatusContainer } from './TaskDialog.components'

export type OnConfirmProps = {
  name: string
  description: string
  isOpen: boolean
}

export type Props = {
  task?: TaskData
  onConfirm: (value: OnConfirmProps) => void
  onArchive?: () => void
}

export const TaskDialog = ({ task, onConfirm, onArchive }: Props) => {
  dialogStore.open(() => {
    const [name, setName] = useState(task?.name ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [isOpen, setIsOpen] = useState(task?.status === 'closed' ? false : true) // If task === undefined, isOpen will be true

    const [filled, setFilled] = useState(false)

    const handleNameChange = (value: string) => {
      if (!filled) setFilled(true)
      setName(value)
    }

    const handleConfirmCreate = () => {
      dialogStore.close()
      onConfirm({ name, description, isOpen })
    }

    const handleArchiveTask = () => {
      dialogStore.close()
      onArchive?.()
    }

    return (
      <Root>
        <Title>
          <Typography variant="h6">{!!task ? 'Edit' : 'Create'} new task</Typography>
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
          />

          <TextField
            type="text"
            label="Description"
            value={description}
            fullWidth
            multiline
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <StatusContainer>
            <Switch checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
            <Chip label={`status: ${isOpen ? 'open' : 'closed'}`} color={isOpen ? 'success' : 'error'} size="small" />
          </StatusContainer>

          <ButtonContainer>
            {!!onArchive ? (
              <Button onClick={handleArchiveTask} variant="contained" color="error">
                Archive
              </Button>
            ) : null}
            <Button disabled={!name} onClick={handleConfirmCreate} variant="contained">
              Confirm
            </Button>
          </ButtonContainer>
        </Content>
      </Root>
    )
  })
}
