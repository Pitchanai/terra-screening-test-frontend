import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react-lite'

import type { TaskData } from 'types/types'

import { TaskColumn } from 'views/pages/homepage/components/TaskColumn/TaskColumn'

import { Root } from './HomePage.components'

const temp: TaskData[] = [
  {
    id: 'uu1',
    name: 'sprint planning',
    description: 'some stuff',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu2',
    name: 'number 2',
    description: 'not first, not last',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu3',
    name: 'terra money',
    description: 'LUNA to de moon',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu4',
    name: 'jira',
    description: 'manage task',
    created: new Date(),
    status: 'closed',
  },
  {
    id: 'uu5',
    name: 'sprint planning',
    description: 'some stuff',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu6',
    name: 'number 2',
    description: 'not first, not last',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu7',
    name: 'terra money',
    description: 'LUNA to de moon',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu8',
    name: 'jira',
    description: 'manage task',
    created: new Date(),
    status: 'closed',
  },
  {
    id: 'uu9',
    name: 'sprint planning',
    description: 'some stuff',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu10',
    name: 'number 2',
    description: 'not first, not last',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu11',
    name: 'terra money',
    description: 'LUNA to de moon',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'uu12',
    name: 'jira',
    description: 'manage task',
    created: new Date(),
    status: 'closed',
  },
]

const temp2: TaskData[] = [
  {
    id: 'aa1',
    name: 'sprint planning',
    description: 'some stuff',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'aa2',
    name: 'number 2',
    description: 'not first, not last',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'aa3',
    name: 'terra money',
    description: 'LUNA to de moon',
    created: new Date(),
    status: 'open',
  },
  {
    id: 'aa4',
    name: 'jira',
    description: 'manage task',
    created: new Date(),
    status: 'closed',
  },
]

export const HomePage = observer(() => {
  const [isBrowser, setIsBrowser] = useState(false)

  const [contents, setContents] = useState<TaskData[]>(temp)
  const [contents2, setContents2] = useState<TaskData[]>(temp2)

  const handleOnDragEnd = (result: DropResult) => {
    console.log('result', result)
    if (!result.destination) return

    if (result.destination.droppableId === 'test') {
      const items = cloneDeep(contents)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      setContents(items)
    } else if (result.destination.droppableId === 'test2') {
      const items = cloneDeep(contents2)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      setContents2(items)
    }
  }

  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  return (
    <Root>
      <Box sx={{ height: '100%', width: '100%', maxHeight: '100%' }}>
        {isBrowser ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Box sx={{ display: 'flex', rowGap: 16, columnGap: 16, height: '100%', width: '100%', maxHeight: '100%' }}>
              <TaskColumn droppableId="test" tasks={contents} />
              <TaskColumn droppableId="test2" tasks={contents2} />
            </Box>
          </DragDropContext>
        ) : null}
      </Box>
    </Root>
  )
})
