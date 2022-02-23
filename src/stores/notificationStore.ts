import { makeAutoObservable } from 'mobx'

export class NotificationStore {
  isShow: boolean
  notificationText: string

  constructor() {
    this.isShow = false
    this.notificationText = ''

    makeAutoObservable(this)
  }

  public show = (text: string) => {
    this.isShow = true
    this.notificationText = text
  }

  public onClose = () => {
    this.isShow = false
    this.notificationText = ''
  }
}

export const notificationStore = new NotificationStore()
