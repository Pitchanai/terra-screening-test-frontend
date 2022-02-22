import { Droppable, Draggable, type DroppableProvided, type DraggableProvided } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import { useMemo, useState, type MouseEvent } from 'react'

import { taskStore } from 'stores/taskStore'

import type { TaskData } from 'types/types'

import { TaskCard } from 'views/pages/homepage/components/TaskCard/TaskCard'
import { TaskDialog, type OnConfirmProps } from 'views/pages/homepage/components/TaskDialog/TaskDialog'
import { NameDialog } from 'views/pages/homepage/components/NameDialog/NameDialog'

import { Root, TaskContainer, TitleContainer } from './TaskColumn.components'

export type Props = {
  columnType?: 'create' | 'default'
  columnId: string
  columnIndex: number
  currentBoardId: string
}

export const TaskColumn = observer(({ columnType = 'default', columnId, columnIndex, currentBoardId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>()

  const tasks: TaskData[] = useMemo(() => {
    return taskStore.columns[columnId]?.tasks ?? []
  }, [taskStore.columns, columnId])

  const handleCreateTask = ({ name, description, isOpen }: OnConfirmProps) => {
    taskStore.createNewTask(name, description, isOpen, columnId)
  }

  const handleCreateNewColumn = (name: string) => {
    if (!currentBoardId) return
    taskStore.createNewColumn(name, currentBoardId)
  }

  const handleManageMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRemoveColumn = () => {
    handleCloseMenu()

    if (tasks.length > 0) return
    taskStore.deleteColumn(columnId, currentBoardId)
  }

  const handleRenameColumn = () => {
    handleCloseMenu()

    NameDialog({
      topic: 'Edit column name',
      defaultValue: taskStore.columns[columnId]?.label ?? '',
      onConfirm: handleRenameConfirm,
    })
  }

  const handleRenameConfirm = (name: string) => {
    if (!name) return

    taskStore.editColumnName(columnId, name)
  }

  const handleCloseMenu = () => {
    setAnchorEl(undefined)
  }

  return columnType === 'create' ? (
    <Root>
      <Typography>Create new column</Typography>
      <Button onClick={() => NameDialog({ topic: 'Create new column', onConfirm: handleCreateNewColumn })}>
        Create
      </Button>
    </Root>
  ) : (
    <Draggable draggableId={columnId} index={columnIndex}>
      {(provided: DraggableProvided) => (
        <Root ref={provided.innerRef} {...provided.draggableProps}>
          <TitleContainer {...provided.dragHandleProps}>
            <Typography>Name: {taskStore.columns[columnId]?.label}</Typography>
            <Button onClick={() => TaskDialog({ onConfirm: handleCreateTask })}>Create task</Button>
            <Button onClick={handleManageMenu}>Manage</Button>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
              <MenuItem onClick={handleRemoveColumn} disabled={tasks.length > 0}>
                <Box>
                  <Typography>Remove Column</Typography>
                  {tasks.length > 0 ? <Typography variant="body2">This column need to be empty.</Typography> : null}
                </Box>
              </MenuItem>
              <MenuItem onClick={handleRenameColumn}>Rename</MenuItem>
              {/* <MenuItem onClick={}>Remove Column</MenuItem> */}
            </Menu>
          </TitleContainer>

          <Droppable droppableId={columnId} type="task">
            {(provided: DroppableProvided) => (
              <TaskContainer {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided: DraggableProvided) => (
                      <TaskCard provided={provided} task={task} taskIndex={index} columnId={columnId} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TaskContainer>
            )}
          </Droppable>
        </Root>
      )}
    </Draggable>
  )
})
