export const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  column: {
    columnId: '',
    columnTitle: '',
    columnList: [],
  },
  task: {
    taskId: '',
    taskTitle: '',
    taskDescr: '',
    taskList: [],
  },
}
export const initialStateCalendar = { dateCurrent: new Date(), taskList: [] }
