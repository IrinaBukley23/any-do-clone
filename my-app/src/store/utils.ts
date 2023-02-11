export const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  column: {
    columnId: '',
    columnTitle: '',
    columnList: [],
    currentId: '',
  },
  task: {
    taskId: '',
    taskTitle: '',
    taskDescr: '',
    taskList: [],
  },
}
