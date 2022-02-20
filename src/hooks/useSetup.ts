import { useEffect, useState } from 'react'

import { taskStore } from 'stores/taskStore'

export const useSetup = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    taskStore.loadStore()
    setIsReady(true)
  }, [])

  return { isReady }
}
