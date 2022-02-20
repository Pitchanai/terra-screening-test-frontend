import { makeAutoObservable } from 'mobx'

import { ColumnData, BoardData } from 'types/types'

const BOARD_DATA_KEY = 'BOARDDATA'
const COLUMN_DATA_KEY = 'COLUMN_DATA'

export class TaskStore {
  columns: Record<string, ColumnData> // Record<uuid, TaskData>
  boards: Record<string, BoardData> // Record<uuid, BoardData>

  constructor() {
    this.columns = {}

    this.loadStore()

    makeAutoObservable(this)
  }

  private loadStore = () => {
    try {
      const loadedBoardData: Record<string, BoardData> = JSON.parse(localStorage.getItem(BOARD_DATA_KEY) ?? '{}')
      this.boards = loadedBoardData

      for (const [key, value] of Object.entries(loadedBoardData)) {
        for (let i = 0; i < value.columnIds.length; i++) {
          const columnKey = `${COLUMN_DATA_KEY}:${value.columnIds[i]}`
          const loadedColumnData: ColumnData = JSON.parse(localStorage.getItem(columnKey) ?? '{}')

          this.columns[key] = loadedColumnData
        }
      }
    } catch (e) {
      console.error(e)
      this.boards = {}
    }
    this.saveStore()
  }

  private saveStore = () => {
    localStorage.setItem(BOARD_DATA_KEY, JSON.stringify(this.boards))

    for (const [key, value] of Object.entries(this.columns)) {
      const columnKey = `${COLUMN_DATA_KEY}:${key}`
      localStorage.setItem(columnKey, JSON.stringify(value))
    }
  }
}

export const taskStore = new TaskStore()
