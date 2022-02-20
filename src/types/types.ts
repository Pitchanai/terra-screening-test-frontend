export type TaskData = {
  id: string
  name: string
  description: string
  created: Date
  status: 'open' | 'closed'
}

export type ColumnData = {
  id: string
  tasks: TaskData[]
  label: string
  created: Date
}

export type BoardData = {
  id: string
  label: string
  columnIds: string[]
  created: Date
}
