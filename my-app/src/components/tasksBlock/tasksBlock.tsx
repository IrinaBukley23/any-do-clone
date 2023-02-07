import './tasksBlock.scss'

import Stack from '@mui/material/Stack'

import TaskCard from './taskCard'
import moment from 'moment'
import { TextField } from '@mui/material'

const tasks = [
  {
    taskId: '1',
    taskTitle: 'Task1',
    // description: 'Description1',
    // people: [],
    // date: moment('2023-03-06 15:30').toDate(),
    taskUser: '111',
    taskList: [],
  },
  {
    taskId: '2',
    taskTitle: 'Task2',
    // description: 'Description2',
    // people: [],
    // date: moment('2023-03-06 12:30').toDate(),
    taskUser: '222',
    taskList: [],
  },
  {
    taskId: '3',
    taskTitle: 'Task3',
    // description: 'Description3',
    // people: [],
    taskUser: '333',
    taskList: [],
  },
]
const TasksBlock = () => {
  return (
    <Stack spacing={2} className='central' p={2}>
      <TextField placeholder='Введите задачу' />
      {tasks.map((task) => (
        <TaskCard key={task.taskId} task={task} />
      ))}
    </Stack>
  )
}

export default TasksBlock
