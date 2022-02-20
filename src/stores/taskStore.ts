import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'

import { ColumnData, BoardData } from 'types/types'
import { cloneDeep } from 'lodash'

const BOARD_DATA_KEY = 'BOARD_DATA'
const COLUMN_DATA_KEY = 'COLUMN_DATA'

export class TaskStore {
  isReady: boolean

  columns: Record<string, ColumnData> // Record<uuid, TaskData>
  boards: Record<string, BoardData> // Record<uuid, BoardData>

  constructor() {
    this.isReady = false

    this.columns = {}
    this.boards = {}

    makeAutoObservable(this)
  }

  public loadStore = () => {
    try {
      const loadedBoardData: Record<string, BoardData> = JSON.parse(localStorage.getItem(BOARD_DATA_KEY) ?? '{}')
      const updatedBoardData = {}

      for (const [key, value] of Object.entries(loadedBoardData)) {
        updatedBoardData[key] = {
          ...value,
          created: new Date(value.created),
        }

        for (let i = 0; i < value.columnIds.length; i++) {
          const columnKey = `${COLUMN_DATA_KEY}:${value.columnIds[i]}`
          const loadedColumnData: ColumnData = JSON.parse(localStorage.getItem(columnKey) ?? '{}')

          this.columns[key] = loadedColumnData
        }
      }

      this.boards = updatedBoardData
    } catch (e) {
      console.error(e)
      this.boards = {}
    }
    this.saveStore()
    this.isReady = true
  }

  private saveStore = () => {
    localStorage.setItem(BOARD_DATA_KEY, JSON.stringify(this.boards))

    for (const [key, value] of Object.entries(this.columns)) {
      const columnKey = `${COLUMN_DATA_KEY}:${key}`
      localStorage.setItem(columnKey, JSON.stringify(value))
    }
  }

  public createNewBoard = (name: string): string => {
    const newUuid = uuid()
    const newBoards = cloneDeep(this.boards)

    newBoards[newUuid] = {
      id: newUuid,
      label: name,
      columnIds: [],
      created: new Date(),
    }

    this.boards = newBoards
    this.saveStore()

    return newUuid
  }
}

export const taskStore = new TaskStore()
