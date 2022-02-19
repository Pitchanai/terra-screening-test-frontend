import { type DialogProps } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

import { StyledCloseButton, StyledDialog } from './CoreDialog.components'

type Props = DialogProps & {
  title?: string
}

export const CoreDialog = (props: Props) => {
  const { children, title, onClose, ...restProps } = props

  return (
    <StyledDialog onClose={onClose} {...restProps}>
      {children}
      <StyledCloseButton onClick={(e) => onClose?.(e, 'backdropClick')}>
        <CloseIcon />
      </StyledCloseButton>
    </StyledDialog>
  )
}
