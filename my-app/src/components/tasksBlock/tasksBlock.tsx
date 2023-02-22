import styles from './tasksBlock.module.scss'
import SearchIcon from '@mui/icons-material/Search'

import Stack from '@mui/material/Stack'
import TaskCard from './taskCard'
import { InputAdornment, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useCallback, useEffect, useState } from 'react'
import { TaskCalendarItemType } from '../../types/types'
import {
  calendarActions,
  calendarSelectors,
  changeTask,
  createTask,
  deleteTask,
  getTaskList,
} from '../../store/reducers/calendarReducer'
import { getCurrTasks } from '../../store/utils'

const TasksBlock = () => {
  const { dateCurrent } = useAppSelector(
    (state) => state.calendar,
    (oldValue, newValue) => oldValue.dateCurrent == newValue.dateCurrent,
  )

  const taskList = useAppSelector((state) => getTaskList(state.calendar))

  const { key } = useAppSelector((state) => state.authorization)
  const [searchString, setSearchString] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
  }

  useEffect(() => {
    dispatch(calendarActions.setSearchString(searchString))
  }, [searchString])
  const dispatch = useAppDispatch()
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (taskTitle && key) dispatch(createTask({ title: taskTitle, date: dateCurrent, key: key }))
      setTaskTitle('')
    }
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findText = e.target.value.trim()
    setSearchString(findText)
  }

  const handleDeleteCard = useCallback((id: number) => {
    if (key) dispatch(deleteTask({ key: key, id: id }))
  }, [])

  const handleChangeCard = useCallback((task: TaskCalendarItemType) => {
    if (key) dispatch(changeTask({ task: task, key: key }))
  }, [])

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
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteCard}
            onChange={handleChangeCard}
          />
        ))}
      </div>
    </Stack>
  )
}

export default TasksBlock
