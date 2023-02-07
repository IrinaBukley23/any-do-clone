export interface IColumn {
  columnId: string;
  columnTitle: string;
  columnList: IColumn[];
}

export type ColumnItemType = Omit<IColumn, 'columnList'>

export interface ITask {
  taskId: string;
  taskTitle: string;
  taskUser: string;
  taskList: ITask[];
}

export type TaskItemType = Omit<ITask, 'taskList'>

export type FormParam = {
  textApprove: string;
  formId: string;
}

export type State = {
  token: string;
  user: null;
  column: IColumn;
 // columnList: IColumn[];
  task: ITask;
//  taskList: ITask[];
}

export interface IUser {
  name: string,
  email: string,
  password: string,
}

export interface IAuthorization {
  email: string,
  password: string,
}

export interface IError {
  message: string,
}

export interface ISession {
  key: string,
  userId: number,
}
