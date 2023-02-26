export enum Actions {
  SET_COLUMN_ID = 'SET_COLUMN_ID',
  SET_COLUMN_TITLE = 'SET_COLUMN_TITLE',
  SET_COLUMN_LIST = 'SET_COLUMN_LIST',
  EDIT_COLUMN_TITLE = 'EDIT_COLUMN_TITLE',
  REMOVE_COLUMN = 'REMOVE_COLUMN',
  SORT_COLUMN_LIST = 'SORT_COLUMN_LIST',
  SET_CURRENT_ID = 'SET_CURRENT_ID',
  SET_TASK_ID = 'SET_TASK_ID',
  SET_TASK_TITLE = 'SET_TASK_TITLE',
  SET_TASK_DESCR = 'SET_TASK_DESCR',
  SET_TASK_LIST = 'SET_TASK_LIST',
  SET_CURRENT_COLUMN_ID = 'SET_CURRENT_COLUMN_ID',
  EDIT_TASK_TITLE = 'EDIT_TASK_TITLE',
  EDIT_TASK_DESCR = 'EDIT_TASK_DESCR',
  REMOVE_TASK = 'REMOVE_TASK',
  SORT_TASK_LIST = 'SORT_TASK_LIST',
  SET_LANG = 'SET_LANG',
}

export enum DialogForm {
  login = 'login',
  register = 'registration',
}

export enum ActionsCalendar {
  SET_CURRENTDATE = 'SET_CURRENTDATE',

  GET_TASKS = 'GET_TASKS',
  EDIT_TASK = 'EDIT_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  ADD_TASK = 'ADD_TASK',
}

export enum Projects {
  health = 'Здоровье',
  buiseness = 'Бизнес',
  family = 'Семья',
  journey = 'Путешествия',
  hobby = 'Хобби',
}

export enum ProjectsEn {
  health = 'Health',
  buiseness = 'Business',
  family = 'Family',
  journey = 'Travel',
  hobby = 'Hobby',
}
export enum Importance {
  immediat = 'Срочно',
  important = 'Важно',
  notImediat = 'Не срочно',
}
export enum ImportanceEn {
  immediat = 'Urgently',
  important = 'Important',
  notImediat = 'Not urgently',
}

export enum TypeChip {
  important = 'tag',
  project = 'projectId',
  description = 'description',
  title = 'title',
  status = 'status',
}

export enum TypeStatusTask {
  notStart = 'Не начиналось',
  start = 'В работе',
  pause = 'Отложено',
  cancel = 'Отменено',
  done = 'Сделано',
}

export enum TypeStatusTaskEn {
  notStart = 'Did not start',
  start = 'In work',
  pause = 'Postponed',
  cancel = 'Canceled',
  done = 'Done',
}

export enum TypeStatusCommon {
  notStart = 'notStart',
  start = 'start',
  pause = 'pause',
  cancel = 'cancel',
  done = 'done',
}

export const typesStartTask = Object.values(TypeStatusCommon).map((key) => ({
  id: key,
  value: TypeStatusTask[key],
}))
export const typesStartTaskEn = Object.values(TypeStatusCommon).map((key) => ({
  id: key,
  value: TypeStatusTaskEn[key],
}))
