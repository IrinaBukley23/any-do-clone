export interface IColumn {
  columnId: string
  columnTitle: string
  columnList: IColumn[]
}

export type ColumnItemType = Omit<IColumn, 'columnList'>

export interface ITask {
  taskId: string
  taskTitle: string
  taskUser: string
  taskList: ITask[]
}

export type TaskItemType = Omit<ITask, 'taskList'>

export type FormParam = {
  textAprove: string
  formId: string
}

export type State = {
  token: string
  user: null
  column: IColumn
  // columnList: IColumn[];
  task: ITask
  calendar: ICalendar
  //  taskList: ITask[];
}
export type ICalendar = {
  dateCurrent: Date
  taskList: TaskCalendarItemType[]
}

export interface ITaskCalendar {
  id: number
  dateCreate: Date
  dateStart?: Date
  dateEnd?: Date
  title: string
  description?: string
  idPersons?: number[]
  isDone?: boolean
  taskList: ITaskCalendar[]
}
export type TaskCalendarItemType = Omit<ITaskCalendar, 'taskList'>
