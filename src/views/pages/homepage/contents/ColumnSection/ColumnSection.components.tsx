import { styled, Box } from '@mui/material'

export const ColumnContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  overflowX: 'auto',
  padding: theme.spacing(2),
}))

export const ColumnContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))
