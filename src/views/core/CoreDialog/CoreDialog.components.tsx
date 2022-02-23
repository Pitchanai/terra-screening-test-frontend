import { Button, Dialog, styled } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

export const StyledCloseButton = styled(Button)(() => ({
  minWidth: 0,
  width: '32px !important',
  height: '32px !important',
  position: 'absolute',
  top: 18,
  right: 24,
  // transform: 'translate(50%, -50%)',
  boxSizing: 'border-box',
  borderRadius: '50%',
  backgroundColor: blueGrey[100],
  color: blueGrey[700],
  zIndex: 100,
  border: `solid 1px ${blueGrey[200]}`,
  '&:hover, &:focus': {
    border: `solid 1px ${blueGrey[900]}`,
    color: blueGrey[800],
    backgroundColor: blueGrey[200],
  },
}))

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    minWidth: '360px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowY: 'scroll',

    [theme.breakpoints.down('xs')]: {
      minWidth: 0,
    },
  },
}))
