import styles from './tasksBlock.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack'
import TaskCard from './taskCard'
import { InputAdornment, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import {
  changeTask,
  createTask,
  deleteTask,
  getSearchedList,
} from '../../store/actions/actionCalendar'
import { TaskCalendarItemType } from '../../types/types'

const TasksBlock = () => {
  const { taskList, dateCurrent } = useAppSelector((state) => state.calendar)
  const [searchString, setSearchString] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
  }
  const { t, } = useTranslation();
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

  const handleDeleteCard = (id: number) => {
    dispatch(deleteTask(id))
  }
  const handleChangeCard = (task: TaskCalendarItemType) => {
    dispatch(changeTask(task))
  }

  return (
    <Stack spacing={2} className={styles.central}>
      <TextField
        placeholder={t('taskSearch')}
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
        placeholder={t('taskCreatePlaceholder')}
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
