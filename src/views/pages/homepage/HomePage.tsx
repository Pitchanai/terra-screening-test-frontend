import { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, SelectChangeEvent, Typography, Select } from '@mui/material'
import { DragDropContext, Droppable, DroppableProvided, type DropResult } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import { taskStore } from 'stores/taskStore'

import type { BoardData } from 'types/types'

import { TaskColumn } from 'views/pages/homepage/components/TaskColumn/TaskColumn'
import { CreateNewDialog } from 'views/pages/homepage/components/CreateNewDialog/CreateNewDialog'

import { Root, Header, SelectBoard, ColumnContainer } from './HomePage.components'

export const HomePage = observer(() => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>()

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result
    if (!destination || !source || !draggableId) return

    if (type === 'task') {
      taskStore.onDragTaskEnded(source, destination, draggableId)
    } else if (type === 'column') {
      taskStore.onDragColumnEnded(source, destination, draggableId)
    }
  }

  const handleCreateNewBoard = (name: string) => {
    const newBoardId = taskStore.createNewBoard(name)
    setSelectedBoard(newBoardId)
  }

  const handleBoardChange = (event: SelectChangeEvent) => {
    setSelectedBoard(event.target.value)
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
      {Object.keys(taskStore.boards).length === 0 ? (
        <Header>
          <Button onClick={() => CreateNewDialog({ type: 'board', onConfirm: handleCreateNewBoard })}>
            Create New Board
          </Button>
        </Header>
      ) : isBrowser ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Header>
            {selectedBoard && (
              <FormControl>
                <InputLabel id="select-board-label">Board</InputLabel>
                <SelectBoard
                  labelId="select-board-label"
                  value={selectedBoard}
                  label="Board"
                  onChange={handleBoardChange}
                >
                  {Object.keys(taskStore.boards).map((boardId) => (
                    <MenuItem value={boardId} key={boardId}>
                      {taskStore.boards[boardId]?.label}
                    </MenuItem>
                  ))}
                </SelectBoard>
              </FormControl>
            )}
            <Button
              onClick={() => CreateNewDialog({ type: 'board', onConfirm: handleCreateNewBoard })}
              sx={{ marginLeft: 2 }}
            >
              New Board
            </Button>
          </Header>

          <ColumnContainer>
            {selectedBoard && (
              <Droppable droppableId={selectedBoard} type="column" direction="horizontal">
                {(provided: DroppableProvided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    {selectedBoard &&
                      taskStore.boards[selectedBoard].columnIds.map((columnId, columnIndex) => (
                        <TaskColumn
                          columnId={columnId}
                          key={columnId}
                          columnIndex={columnIndex}
                          currentBoardId={selectedBoard}
                        />
                      ))}
                    <TaskColumn columnType="create" columnId={''} columnIndex={9999} currentBoardId={selectedBoard} />
                  </Box>
                )}
              </Droppable>
            )}
          </ColumnContainer>
        </DragDropContext>
      ) : null}
    </Root>
  )
})
