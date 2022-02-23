import { styled, Box, Select, Button } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Header = styled(Box)(() => ({
  display: 'flex',
  padding: 16,
  borderBottom: '1px solid lightgrey',
  background: grey[100],
}))

export const SelectBoard = styled(Select)(() => ({
  width: 200,
}))

export const NewBoardButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))
