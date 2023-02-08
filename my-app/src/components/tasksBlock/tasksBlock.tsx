import styles from './tasksBlock.module.scss'

import Stack from '@mui/material/Stack'
import TaskCard from './taskCard'
import { Paper, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useState } from 'react'
import { calendarActions } from '../../store/reducers/calendarReducer'

const TasksBlock = () => {
  const { taskList } = useAppSelector((state) => state.calendar)
  const [taskTitle, setTaskTitle] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
  }
  const dispatch = useAppDispatch()
  const handleBlur = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (taskTitle) dispatch(calendarActions.createTask(taskTitle))
      setTaskTitle('')
    }
  }
  return (
    <Stack spacing={2} className={styles.central} p={2}>
      <TextField
        placeholder='Введите задачу'
        value={taskTitle}
        onChange={handleChange}
        onKeyUp={handleBlur}
      />
      <div className={styles.wrapper}>
        {taskList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </Stack>
  )
}

export default TasksBlock
