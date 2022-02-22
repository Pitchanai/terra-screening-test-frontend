import { styled, Box, Select, Button } from '@mui/material'

export const Header = styled(Box)(() => ({
  display: 'flex',
  padding: 16,
  borderBottom: '1px solid lightgrey',
}))

export const SelectBoard = styled(Select)(() => ({
  width: 200,
}))

export const NewBoardButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))
