import { styled, Box } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

export const Root = styled(Box)(({ theme }) => ({
  width: 400,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))

export const Title = styled(Box)(({ theme }) => ({
  height: 66,
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  background: blueGrey[800],
  color: 'white',
  display: 'flex',
  alignItems: 'center',
}))

export const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}))
