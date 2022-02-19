import { Button, Dialog, DialogTitle, DialogContent, styled } from '@mui/material'

export const StyledCloseButton = styled(Button)(() => ({
  minWidth: 0,
  width: '36px !important',
  height: '36px !important',
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  boxSizing: 'border-box',
  borderRadius: '50%',
  backgroundColor: '#3e3e3e',
  zIndex: 100,
  '&:hover, &:focus': {
    border: 'solid 1px #29b2ff',
    backgroundColor: '#1e262d',
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
    padding: '16px 8px',

    [theme.breakpoints.down('xs')]: {
      minWidth: 0,
    },
  },
}))
