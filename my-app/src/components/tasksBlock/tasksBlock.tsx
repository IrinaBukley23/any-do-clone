import './tasksBlock.scss'

import Stack from '@mui/material/Stack'

import TaskCard from './taskCard'
import moment from 'moment'
import { TextField } from '@mui/material'

const tasks = [
  {
    id: 1,
    title: 'Task1',
    description: 'Description1',
    people: [],
    date: moment('2023-03-06 15:30').toDate(),
  },
  {
    id: 2,
    title: 'Task2',
    description: 'Description2',
    people: [],
    date: moment('2023-03-06 12:30').toDate(),
  },
  {
    id: 3,
    title: 'Task3',
    description: 'Description3',
    people: [],
  },
]
const TasksBlock = () => {
  return (
    <Stack spacing={2} className='central' p={2}>
      <TextField placeholder='Введите задачу' />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}

export default TasksBlock
