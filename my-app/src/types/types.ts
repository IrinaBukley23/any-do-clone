import { TypeStatusTask, Projects, Importance, ImportanceEn, ProjectsEn, TypeStatusTaskEn } from './enum'
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
  currentId: string
}

export type Lang = {
  lang: string
}

export interface ITask {
  taskId: string
  taskTitle: string
  taskDescr: string
  taskOrder: number
  taskList: ITask[]
  taskUser: string
  currentColumnId: string
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

export type TypeUserMenu = Omit<IUser, 'password'>

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

export interface ITaskCalendar {
  id: number
  dateCreate: string
  status: TypeStatusTask | TypeStatusTaskEn
  dateStart?: string
  dateEnd?: string
  title: string
  description?: string
  idPersons?: number[]

  important?: Importance | ImportanceEn
  project?: Projects | ProjectsEn
  taskList: ITaskCalendar[]
}
export type TaskCalendarItemType = Omit<ITaskCalendar, 'taskList'>

export type TimeCalendar = {
  id: number
  time: Moment
}
