import {
  TypeStatusTask,
  Projects,
  Importance,
  ImportanceEn,
  ProjectsEn,
  TypeStatusTaskEn,
  TypeStatusCommon,
} from './enum'
import { Moment } from 'moment'
export interface IColumn {
  columnId: string
  columnTitle: string
  columnOrder: number
  columnList: IColumn[]
  taskList?: ITask[]
}

export type ColumnItemType = Omit<IColumn, 'columnList'>
export type CurrentId = {
  currentId?: number
}

export type Lang = {
  lang: string
}

export interface ITask {
  taskId: string
  taskTitle: string
  taskDescr: string
  taskOrder: number
  taskList: TaskItemType[]
  currentColumnId?: number
}

export type TaskItemType = Omit<ITask, 'taskList'>

export type FormParam = {
  textApprove: string
  formId: string
}

export type State = {
  token: string
  user: null
  column: IColumn
  task: ITask
  calendar: ICalendar
  currentId: CurrentId
  lang: Lang
}

export interface IUser {
  name: string
  email: string
  password: string
}

export interface IAuthorization {
  email: string
  password: string
}

export interface IError {
  message: string
}

export interface ISession {
  key: string
  userId: number
  name: string
  email: string
}

export type ICalendar = {
  dateCurrent: string
  searchString: string
  taskListAll: TaskCalendarItemType[]
  taskList: TaskCalendarItemType[]
  dateSelectedInPlan: string
  taskListInPlan: TaskCalendarItemType[]
}

export interface ITaskCalendarCreate {
  title: string
  performDate: string
  status: TypeStatusCommon
  description?: string
  project?: Projects | ProjectsEn
  projectId?: number
  tag?: Importance | ImportanceEn
}
export interface ITaskCalendar extends ITaskCalendarCreate {
  id: number
  taskList: ITaskCalendar[]
}

export type Project = {
  id: number
  name: string
}

export type TaskCalendarItemType = Omit<ITaskCalendar, 'taskList'>

export type TimeCalendar = {
  id: number
  time: Moment
}

export type MenuItemType = {
  id: string | number
  value: string
}
