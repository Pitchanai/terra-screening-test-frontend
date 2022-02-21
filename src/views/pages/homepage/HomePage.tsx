import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import { taskStore } from 'stores/taskStore'

import type { BoardData } from 'types/types'

import { TaskColumn } from 'views/pages/homepage/components/TaskColumn/TaskColumn'
import { CreateNewDialog } from 'views/pages/homepage/components/CreateNewDialog/CreateNewDialog'

import { Root } from './HomePage.components'

export const HomePage = observer(() => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>()

  const handleOnDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination || !source || !draggableId) return

    taskStore.onDragEnded(source, destination, draggableId)
  }

  const handleCreateNewBoard = (name: string) => {
    const newBoardId = taskStore.createNewBoard(name)
    setSelectedBoard(newBoardId)
  }

  const handleCreateNewColumn = (name: string) => {
    if (!selectedBoard) return
    taskStore.createNewColumn(name, selectedBoard)
  }

  /**
   * useEffect
   */
  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  useEffect(() => {
    if (!taskStore.isReady) return
    if (Object.keys(taskStore.boards).length === 0) return

    const compare = (a: BoardData, b: BoardData) => a.created.getTime() - b.created.getTime()
    const firstBoardId = Object.values(taskStore.boards).sort(compare)?.[0]?.id

    setSelectedBoard(firstBoardId)
  }, [taskStore.isReady])

  /**
   * UI
   */
  return (
    <Root>
      <Box sx={{ height: '100%', width: '100%', maxHeight: '100%' }}>
        {Object.keys(taskStore.boards).length === 0 ? (
          <Button onClick={() => CreateNewDialog({ type: 'board', onConfirm: handleCreateNewBoard })}>
            Create New Board
          </Button>
        ) : isBrowser ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Button onClick={() => CreateNewDialog({ type: 'board', onConfirm: handleCreateNewBoard })}>
              Create New Board
            </Button>
            {selectedBoard && <Typography>Board: {taskStore.boards[selectedBoard].label}</Typography>}
            <Box
              sx={{
                display: 'flex',
                rowGap: 4,
                columnGap: 4,
                height: '100%',
                width: '100%',
                maxHeight: '100%',
                overflowX: 'auto',
              }}
            >
              {selectedBoard &&
                taskStore.boards[selectedBoard].columnIds.map((columnId) => (
                  <TaskColumn columnId={columnId} key={columnId} tasks={taskStore.columns[columnId]?.tasks ?? []} />
                ))}
              <Box>
                <Typography>Create new column</Typography>
                <Button onClick={() => CreateNewDialog({ type: 'column', onConfirm: handleCreateNewColumn })}>
                  Create
                </Button>
              </Box>
            </Box>
          </DragDropContext>
        ) : null}
      </Box>
    </Root>
  )
})
