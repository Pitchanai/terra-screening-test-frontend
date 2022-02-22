import { styled, Box } from '@mui/material'

export const ColumnContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  overflowX: 'auto',
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const ColumnContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  // rowGap: theme.spacing(4),
  // columnGap: theme.spacing(4),
}))
