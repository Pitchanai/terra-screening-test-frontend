import { Snackbar, Alert } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { notificationStore } from 'stores/notificationStore'

export const GlobalNotification = observer(() => {
  return (
    <Snackbar
      open={notificationStore.isShow}
      onClose={() => notificationStore.onClose()}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={() => notificationStore.onClose()} severity="success" sx={{ width: '100%' }}>
        {notificationStore.notificationText}
      </Alert>
    </Snackbar>
  )
})
