export type TaskData = {
  id: string
  name: string
  description: string
  created: Date
  status: 'open' | 'closed'
}

export type ColumnData = {
  tasks: TaskData[]
  label: string
}

export type BoardData = {
  label: string
  columnIds: string[]
}
