export enum Actions {
  SET_COLUMNID = 'SET_COLUMNID',
  SET_COLUMNTITLE = 'SET_COLUMNTITLE',
  SET_COLUMNLIST = 'SET_COLUMNLIST',
  EDIT_COLUMNTITLE = 'EDIT_COLUMNTITLE',
  REMOVE_COLUMN = 'REMOVE_COLUMN',
  SET_CURRENTID = 'SET_CURRENTID',
  SET_TASKID = 'SET_TASKID',
  SET_TASKTITLE = 'SET_TASKTITLE',
  SET_TASKDESCR = 'SET_TASKDESCR',
  SET_TASKLIST = 'SET_TASKLIST',
  SET_CURRENTCOLUMNID = 'SET_CURRENTCOLUMNID',
  EDIT_TASKTITLE = 'EDIT_TASKTITLE',
  EDIT_TASKDESCR = 'EDIT_TASKDESCR',
  REMOVE_TASK = 'REMOVE_TASK',
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
export enum Importance {
  immediat = 'Срочно',
  important = 'Важно',
  notImediat = 'Не срочно',
}

export enum TypeChip {
  important = 'important',
  project = 'project',
  description = 'description',
  title = 'title',
}
