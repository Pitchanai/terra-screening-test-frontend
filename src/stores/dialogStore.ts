import { makeAutoObservable } from 'mobx'

type DialogOptions = {
  title?: string
  onClose?: () => void
}

export class DialogStore {
  private defaultOptions = {
    onClose: () => this.close(),
  }

  content: React.ElementType | string | undefined = undefined

  options: DialogOptions = this.defaultOptions

  isOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  open = (content: React.ElementType | string, options: DialogOptions = {}) => {
    this.content = content
    this.options = { ...this.defaultOptions, ...options }
    this.isOpen = true
  }

  close = () => {
    this.isOpen = false
  }
}

export const dialogStore = new DialogStore()
