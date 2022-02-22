import { Box, Select, styled } from '@mui/material'

export const Root = styled('div')(() => ({
  width: '100vw',
  height: '100vh',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}))

export const Header = styled(Box)(() => ({
  display: 'flex',
  padding: 16,
}))

export const SelectBoard = styled(Select)(() => ({
  width: 200,
}))

export const ColumnContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(4),
  height: '100%',
  width: '100%',
  overflowX: 'auto',
}))
