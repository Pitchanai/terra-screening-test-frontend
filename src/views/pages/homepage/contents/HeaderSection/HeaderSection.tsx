import { FormControl, InputLabel, MenuItem, type SelectChangeEvent } from '@mui/material'
import { Add } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'

import { taskStore } from 'stores/taskStore'

import { NameDialog } from 'views/pages/homepage/components/NameDialog/NameDialog'

import { Header, SelectBoard, NewBoardButton } from './HeaderSection.components'

export type Props = {
  selectedBoard: string | undefined
  onSelectBoard: (value: string) => void
}

export const HeaderSection = observer(({ selectedBoard, onSelectBoard }: Props) => {
  const handleBoardChange = (event: SelectChangeEvent) => {
    onSelectBoard(event.target.value)
  }

  const handleCreateNewBoard = (name: string) => {
    const newBoardId = taskStore.createNewBoard(name)
    onSelectBoard(newBoardId)
  }

  return (
    <Header>
      {selectedBoard && (
        <FormControl>
          <InputLabel id="select-board-label">Board</InputLabel>
          <SelectBoard labelId="select-board-label" value={selectedBoard} label="Board" onChange={handleBoardChange}>
            {Object.keys(taskStore.boards).map((boardId) => (
              <MenuItem value={boardId} key={boardId}>
                {taskStore.boards[boardId]?.label}
              </MenuItem>
            ))}
          </SelectBoard>
        </FormControl>
      )}

      <NewBoardButton
        onClick={() => NameDialog({ topic: 'Create new board', onConfirm: handleCreateNewBoard })}
        variant="contained"
      >
        <Add />
      </NewBoardButton>
    </Header>
  )
})
