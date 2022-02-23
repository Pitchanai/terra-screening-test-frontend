import { Droppable, DroppableProvided } from 'react-beautiful-dnd'

import { taskStore } from 'stores/taskStore'

import { useBreakpoints } from 'views/hooks/useBreakpoints'

import { TaskColumn } from 'views/pages/homepage/components/TaskColumn/TaskColumn'

import { ColumnContainer, ColumnContent } from './ColumnSection.components'

type Props = {
  selectedBoard: string
}

export const ColumnSection = ({ selectedBoard }: Props) => {
  const { downSm } = useBreakpoints()

  return (
    <ColumnContainer>
      <Droppable droppableId={selectedBoard!} type="column" direction={downSm ? 'vertical' : 'horizontal'}>
        {(provided: DroppableProvided) => (
          <ColumnContent {...provided.droppableProps} ref={provided.innerRef}>
            {taskStore.boards[selectedBoard!].columnIds.map((columnId, columnIndex) => (
              <TaskColumn
                columnId={columnId}
                key={columnId}
                columnIndex={columnIndex}
                currentBoardId={selectedBoard!}
              />
            ))}

            <TaskColumn columnType="create" columnId={''} columnIndex={9999} currentBoardId={selectedBoard!} />
          </ColumnContent>
        )}
      </Droppable>
    </ColumnContainer>
  )
}
