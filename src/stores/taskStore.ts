import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import type { DraggableLocation } from 'react-beautiful-dnd'

import { ColumnData, BoardData } from 'types/types'

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

          this.columns[value.columnIds[i]] = {
            ...loadedColumnData,
            created: new Date(loadedColumnData.created),
          }
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

  public createNewColumn = (name: string, boardId: string): string => {
    const newUuid = uuid()
    const newBoards = cloneDeep(this.boards)
    const newColumns = cloneDeep(this.columns)

    newColumns[newUuid] = {
      id: newUuid,
      label: name,
      tasks: [],
      created: new Date(),
    }

    newBoards[boardId]?.columnIds.push(newUuid)

    this.boards = newBoards
    this.columns = newColumns

    this.saveStore()

    return newUuid
  }

  public createNewTask = (name: string, description: string, isOpen: boolean, columnId: string): string => {
    const newUuid = uuid()
    const newColumns = cloneDeep(this.columns)

    console.log('createNewTask', name, description, isOpen, columnId, newColumns)

    newColumns[columnId].tasks.push({
      id: newUuid,
      name,
      description,
      created: new Date(),
      status: isOpen ? 'open' : 'closed',
    })

    this.columns = newColumns

    this.saveStore()

    return newUuid
  }

  public editTask = (
    name: string,
    description: string,
    isOpen: boolean,
    columnId: string,
    taskIndex: number,
    taskId: string,
  ) => {
    const newColumns = cloneDeep(this.columns)

    if (newColumns[columnId].tasks[taskIndex].id !== taskId) return

    newColumns[columnId].tasks[taskIndex] = {
      ...newColumns[columnId].tasks[taskIndex],
      name,
      description,
      status: isOpen ? 'open' : 'closed',
    }

    this.columns = newColumns

    this.saveStore()
  }

  public onDragEnded = (source: DraggableLocation, destination: DraggableLocation, draggableId: string): void => {
    const newColumn = cloneDeep(this.columns)
    const newSourceColumn = newColumn[source.droppableId]
    const newDestinationColumn =
      source.droppableId === destination.droppableId ? newSourceColumn : newColumn[destination.droppableId]

    const [draggedItem] = newSourceColumn.tasks.splice(source.index, 1)
    if (draggedItem.id !== draggableId) return
    newDestinationColumn.tasks.splice(destination.index, 0, draggedItem)

    newColumn[source.droppableId] = newSourceColumn
    newColumn[destination.droppableId] = newDestinationColumn

    this.columns = newColumn

    this.saveStore()
  }
}

export const taskStore = new TaskStore()
