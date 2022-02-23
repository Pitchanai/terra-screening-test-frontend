import { Box, styled } from '@mui/material'
import { blueGrey, lightGreen } from '@mui/material/colors'

export const Root = styled(Box)(({ theme }) => ({
  height: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
  width: 300,
  minWidth: 300,
  display: 'flex',
  flexDirection: 'column',
  background: blueGrey[100],
  borderRadius: 16,
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    overflowY: 'unset',
    marginBottom: theme.spacing(2),
  },
}))

export const RootNewColumn = styled(Box)(({ theme }) => ({
  width: 300,
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingBottom: theme.spacing(4),
  },
}))

export const NewColumnContainer = styled(Box)(({ theme }) => ({
  height: 200,
  width: '100%',
  borderRadius: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  columnGap: theme.spacing(1),
  color: lightGreen[800],
  border: `1px dashed ${lightGreen[300]}`,
  transition: 'all 0.4s ease',
  transitionProperty: ['background', 'color'].join(','),
  cursor: 'pointer',
  '&:hover': {
    background: lightGreen[100],
    color: lightGreen[900],
  },
}))

export const TaskContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  maxHeight: '100%',
  width: '100%',
  padding: theme.spacing(2),
}))

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: blueGrey[600],
  color: 'white',
  borderRadius: '16px 16px 0 0',
}))

export const NoTaskContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
}))
