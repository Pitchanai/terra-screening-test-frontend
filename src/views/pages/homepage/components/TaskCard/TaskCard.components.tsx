import { Box, styled } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  background: grey[50],
  borderRadius: 16,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  transition: 'all 0.4s ease',
  transitionProperty: ['background', 'box-shadow'].join(','),
  '&:hover': {
    background: 'white',
    boxShadow: theme.shadows[5],
  },
}))

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  columnGap: theme.spacing(2),
}))
