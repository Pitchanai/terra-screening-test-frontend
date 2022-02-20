import { Droppable, Draggable, type DroppableProvided, type DraggableProvided } from 'react-beautiful-dnd'

import type { TaskData } from 'types/types'

import { TaskCard } from 'views/pages/homepage/components/TaskCard/TaskCard'

import { Root } from './TaskColumn.components'

export type Props = {
  droppableId: string
  tasks: TaskData[]
}

export const TaskColumn = ({ droppableId, tasks }: Props) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided: DroppableProvided) => (
        <Root {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided: DraggableProvided) => <TaskCard provided={provided} task={task} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </Root>
      )}
    </Droppable>
  )
}
