import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import type { DraggableLocation } from 'react-beautiful-dnd'

import { ColumnData, BoardData, TaskData } from 'types/types'

const BOARD_DATA_KEY = 'BOARD_DATA'
const COLUMN_DATA_KEY = 'COLUMN_DATA'
const ARCHIVED_TASK_KEY = 'ARCHIVED_TASK'

export class TaskStore {
  isReady: boolean

  columns: Record<string, ColumnData> // Record<uuid, TaskData>
  boards: Record<string, BoardData> // Record<uuid, BoardData>
  archivedTasks: TaskData[]

  constructor() {
    this.isReady = false

    this.columns = {}
    this.boards = {}
    this.archivedTasks = []

    makeAutoObservable(this)
  }

  public loadStore = () => {
    try {
      const loadedBoardData: Record<string, BoardData> = JSON.parse(localStorage.getItem(BOARD_DATA_KEY) ?? '{}')
      const updatedBoardData = {}

      const loadedArchivedTask: TaskData[] = JSON.parse(localStorage.getItem(ARCHIVED_TASK_KEY) ?? '[]')

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

      const updatedArchivedTask = loadedArchivedTask.map((v) => ({ ...v, created: new Date(v.created) }))

      this.boards = updatedBoardData
      this.archivedTasks = updatedArchivedTask
    } catch (e) {
      console.error(e)
      this.boards = {}
    }

    this.saveStore()
    this.isReady = true
  }

  private saveStore = () => {
    localStorage.setItem(BOARD_DATA_KEY, JSON.stringify(this.boards))
    localStorage.setItem(ARCHIVED_TASK_KEY, JSON.stringify(this.archivedTasks))

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

  public archiveTask = (columnId: string, taskId: string, taskIndex: number) => {
    const newColumns = cloneDeep(this.columns)
    const newArchivedTasks = cloneDeep(this.archivedTasks)

    if (newColumns[columnId].tasks[taskIndex].id !== taskId) return

    newArchivedTasks.push(newColumns[columnId].tasks[taskIndex])
    newColumns[columnId].tasks.splice(taskIndex, 1)

    this.columns = newColumns
    this.archivedTasks = newArchivedTasks

    this.saveStore()
  }

  public onDragTaskEnded = (source: DraggableLocation, destination: DraggableLocation, draggableId: string): void => {
    const newColumns = cloneDeep(this.columns)
    const newSourceColumn = newColumns[source.droppableId]
    const sameColumn = source.droppableId === destination.droppableId
    const newDestinationColumn = sameColumn ? newSourceColumn : newColumns[destination.droppableId]

    const [draggedItem] = newSourceColumn.tasks.splice(source.index, 1)

    if (draggedItem.id !== draggableId) return
    newDestinationColumn.tasks.splice(destination.index, 0, draggedItem)

    newColumns[source.droppableId] = newSourceColumn
    newColumns[destination.droppableId] = newDestinationColumn

    this.columns = newColumns

    this.saveStore()
  }

  public onDragColumnEnded = (source: DraggableLocation, destination: DraggableLocation, draggableId: string): void => {
    const newBoards = cloneDeep(this.boards)

    const [draggedId] = newBoards[source.droppableId].columnIds.splice(source.index, 1)

    if (draggedId !== draggableId) return
    newBoards[source.droppableId].columnIds.splice(destination.index, 0, draggableId)

    this.boards = newBoards

    this.saveStore()
  }

  public editColumnName = (columnId: string, name: string) => {
    const newColumns = cloneDeep(this.columns)

    newColumns[columnId].label = name

    this.columns = newColumns

    this.saveStore()
  }

  public deleteColumn = (columnId: string, boardId: string) => {
    const newColumns = cloneDeep(this.columns)
    const newBoards = cloneDeep(this.boards)

    if (newColumns[columnId].tasks.length !== 0) return

    delete newColumns[columnId]

    const deleteIndex = newBoards[boardId].columnIds.findIndex((v) => v === columnId)
    if (deleteIndex < 0) return
    newBoards[boardId].columnIds.splice(deleteIndex, 1)

    this.columns = newColumns
    this.boards = newBoards

    this.saveStore()
  }
}

export const taskStore = new TaskStore()
