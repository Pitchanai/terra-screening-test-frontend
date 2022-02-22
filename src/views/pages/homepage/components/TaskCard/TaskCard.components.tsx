import { Box, styled } from '@mui/material'
import { grey } from '@mui/material/colors'

const shouldForwardProp = (props: string) => !['isDragging'].includes(props)
export const Root = styled(Box, { shouldForwardProp })<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  background: isDragging ? 'rgba(255, 255, 255, 0.6)' : grey[50],
  borderRadius: 16,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  transition: 'all 0.4s ease',
  backdropFilter: isDragging ? 'blur(8px)' : '',
  boxShadow: isDragging ? theme.shadows[2] : '',
  transitionProperty: ['background', 'box-shadow', 'backdrop-filter'].join(','),
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
