import { Box, styled } from '@mui/material'

export const Root = styled(Box)(() => ({
  height: '100%',
  maxHeight: '100%',
  padding: 24,
  overflowY: 'auto',
  width: 200,
  minWidth: 200,
  display: 'flex',
  flexDirection: 'column',
}))

export const TaskContainer = styled(Box)(() => ({
  background: 'pink',
  height: '100%',
  maxHeight: '100%',
  width: '100%',
}))

export const TitleContainer = styled(Box)(() => ({ background: 'blue' }))
