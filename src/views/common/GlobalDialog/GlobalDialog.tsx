import { observer } from 'mobx-react-lite'
import { isString } from 'lodash'

import { dialogStore } from 'stores/dialogStore'

import { CoreDialog } from 'views/core/CoreDialog/CoreDialog'

export const GlobalDialog = observer(() => {
  const { content, isOpen, options } = dialogStore
  const { onClose } = options

  const Content = content as React.ReactType

  if (!content) return null

  return (
    <CoreDialog open={isOpen} onClose={onClose ?? dialogStore.close}>
      {isString(content) ? content : <Content />}
    </CoreDialog>
  )
})
