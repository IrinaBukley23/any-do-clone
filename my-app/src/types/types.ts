import {
  Projects,
  Importance,
  ImportanceEn,
  ProjectsEn,
  TypeStatusCommon,
} from './enum'
import { Moment } from 'moment'
import { RootState } from '../store/store'

export type Lang = {
  lang: string
}

export interface ICard {
  id: number,
  columnId: number,
  title: string,
  description?: string,
  participant?: string,
  order: number,
}

export interface ICardEdit {
  columnId: number,
  title: string,
  description?: string,
  participant?: string,
  order: number,
}

export interface IColumn {
  id: number;
  title: string;
  ownerId: number;
  order: number;
}

export interface IColumnCreation {
  title: string;
  order: number;
}

export interface IColumnUpdate {
  title: string;
  order: number;
}

export interface IUser {
  id: string,
  name: string,
  email: string
}

export type FormParam = {
  textApprove: string
  formId: string
}

export type State = RootState

export interface IRegistration {
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
