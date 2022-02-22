import { styled, Box } from '@mui/material'

export const ColumnContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(4),
  height: '100%',
  width: '100%',
  overflowX: 'auto',
}))

export const ColumnContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}))
