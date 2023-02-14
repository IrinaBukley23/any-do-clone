import styles from './tasksBlock.module.scss'
import SearchIcon from '@mui/icons-material/Search'

import Stack from '@mui/material/Stack'
import TaskCard from './taskCard'
import { InputAdornment, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { createTask, deleteTask, getSearchedList } from '../../store/actions/actionCalenda'

const TasksBlock = () => {
  const { taskList, dateCurrent } = useAppSelector((state) => state.calendar)
  const [searchString, setSearchString] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
  }
  useEffect(() => {
    getSearchedList(searchString)
  }, [searchString])
  const dispatch = useAppDispatch()
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (taskTitle) dispatch(createTask(taskTitle, dateCurrent))
      setTaskTitle('')
    }
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findText = e.target.value.trim()
    setSearchString(findText)
  }

  return (
    <Stack spacing={2} className={styles.central}>
      <TextField
        placeholder='Начните вводить для поиска...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchString}
        onChange={handleSearchChange}
      />
      <TextField
        placeholder='Введите задачу'
        value={taskTitle}
        onChange={handleChange}
        onKeyUp={handleKey}
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
