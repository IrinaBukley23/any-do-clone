export interface IColumn {
  columnId: string;
  columnTitle: string;
}

export interface ITask {
  taskId: string;
  taskTitle: string;
  taskUser: string;
}

export type FormParam = {
  textAprove: string;
  formId: string;
}

export type State = {
  token: string;
  user: null;
  column: IColumn;
  columnList: IColumn[];
  task: ITask;
  taskList: ITask[];
}