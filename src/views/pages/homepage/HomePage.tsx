import { useEffect, useState, useMemo } from 'react'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'

import { taskStore } from 'stores/taskStore'

import type { BoardData } from 'types/types'

import { ColumnSection } from './contents/ColumnSection/ColumnSection'
import { HeaderSection } from './contents/HeaderSection/HeaderSection'

import { Root } from './HomePage.components'

export const HomePage = observer(() => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>()

  /**
   * handle
   */
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result
    if (!destination || !source || !draggableId) return

    if (type === 'task') {
      taskStore.onDragTaskEnded(source, destination, draggableId)
    } else if (type === 'column') {
      taskStore.onDragColumnEnded(source, destination, draggableId)
    }
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
   * useMemo
   */

  const showColumn: boolean = useMemo(() => {
    return Object.keys(taskStore.boards).length >= 0 && !!selectedBoard
  }, [taskStore.boards])

  /**
   * UI
   */
  return (
    <Root>
      {isBrowser ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <HeaderSection selectedBoard={selectedBoard} onSelectBoard={setSelectedBoard} />

          {showColumn ? <ColumnSection selectedBoard={selectedBoard!} /> : null}
        </DragDropContext>
      ) : null}
    </Root>
  )
})
