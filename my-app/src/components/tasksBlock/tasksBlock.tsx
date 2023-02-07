import './tasksBlock.scss'

import Stack from '@mui/material/Stack'

import TaskCard from './taskCard'

import { TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { State } from '../../types/types'

const TasksBlock = () => {
  const { taskList } = useSelector((state: State) => state.calendar)
  return (
    <Stack spacing={2} className='central' p={2}>
      <TextField placeholder='Введите задачу' />
      {taskList.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}

export default TasksBlock
