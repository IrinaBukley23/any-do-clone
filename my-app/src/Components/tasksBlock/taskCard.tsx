import { Card, Chip, Menu, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { TaskCalendarItemType } from '../../types/types'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import styles from './tasksBlock.module.scss'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import { deleteTask } from '../../store/actions/actionCalenda'
import { useAppDispatch } from '../../store/hooks'
import { useState } from 'react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

type Props = {
  task: TaskCalendarItemType
}

const TaskCard = ({ task }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [taskEdit, setTaskIsEdit] = useState(task)
  const dispatch = useAppDispatch()
  // console.log(task.taskDate)
  const handleClick = () => {
    dispatch(deleteTask(task.id))
  }
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }
  const handleIsDone = () => {
    // onDelete(task.id)
  }
  const showMenu = () => {
    // ggg
  }
  if (isEdit)
    return (
      <Card className={styles.card}>
        <CardContent>
          <Stack direction='row'>
            <Checkbox
              inputProps={{ 'aria-label': 'task' }}
              onChange={handleIsDone}
              checked={taskEdit.isDone}
            />
            <TextField label='Заголовок задачи' value={taskEdit.title}></TextField>
          </Stack>
          <TextField label='Описание задачи' value={taskEdit.description}></TextField>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label='Дата'
              onChange={handleEdit}
              value={taskEdit.dateCreate}
            />
          </LocalizationProvider>
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit}>Save</Button>
          <Button onClick={handleClick}>Delete</Button>
        </CardActions>
      </Card>
    )
  return (
    <Card className={styles.card}>
      <CardContent>
        <Stack direction='row'>
          <Checkbox
            inputProps={{ 'aria-label': 'task' }}
            onChange={handleIsDone}
            checked={task.isDone}
          />
          <Typography variant='h5'>{task.title}</Typography>
        </Stack>
        <Typography>{task.description}</Typography>
        <p>{task.dateCreate}</p>
      </CardContent>
      <Chip
        variant='outlined'
        label='проект'
        onDelete={showMenu}
        deleteIcon={<ControlPointIcon />}
      />
      <Menu
        id='card-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

      <CardActions>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleClick}>Delete</Button>
      </CardActions>
    </Card>
  )
}
export default TaskCard
