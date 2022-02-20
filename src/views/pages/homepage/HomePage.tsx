import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import { taskStore } from 'stores/taskStore'

import type { TaskData } from 'types/types'

import { TaskColumn } from 'views/pages/homepage/components/TaskColumn/TaskColumn'

import { Root } from './HomePage.components'
import { dialogStore } from 'stores/dialogStore'
import { CreateNewBoardDialog } from './components/CreateBoardDialog/CreateBoardDialog'

export const HomePage = observer(() => {
  const [isBrowser, setIsBrowser] = useState(false)

  const handleOnDragEnd = (result: DropResult) => {
    console.log('result', result)
    if (!result.destination) return

    // if (result.destination.droppableId === 'test') {
    //   const items = cloneDeep(contents)
    //   const [reorderedItem] = items.splice(result.source.index, 1)
    //   items.splice(result.destination.index, 0, reorderedItem)

    //   setContents(items)
    // } else if (result.destination.droppableId === 'test2') {
    //   const items = cloneDeep(contents2)
    //   const [reorderedItem] = items.splice(result.source.index, 1)
    //   items.splice(result.destination.index, 0, reorderedItem)

    //   setContents2(items)
    // }
  }

  const handleCreateNewBoard = (name: string) => {
    taskStore.createNewBoard(name)
  }

  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  return (
    <Root>
      <Box sx={{ height: '100%', width: '100%', maxHeight: '100%' }}>
        {Object.keys(taskStore.boards).length === 0 ? (
          <Button onClick={() => CreateNewBoardDialog({ onConfirm: handleCreateNewBoard })}>Create New Board</Button>
        ) : isBrowser ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Box sx={{ display: 'flex', rowGap: 16, columnGap: 16, height: '100%', width: '100%', maxHeight: '100%' }}>
              {/* <TaskColumn droppableId="test" tasks={contents} /> */}
              {/* <TaskColumn droppableId="test2" tasks={contents2} /> */}
            </Box>
          </DragDropContext>
        ) : null}
      </Box>
    </Root>
  )
})
