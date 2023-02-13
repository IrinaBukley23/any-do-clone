import { Card, Chip, IconButton, TextField } from '@mui/material'
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
import { changeTask, deleteTask } from '../../store/actions/actionCalenda'
import { useAppDispatch } from '../../store/hooks'
import { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import TextFieldEdit from '../UI/textFieldEdit/textFieldEdit'

import TaskMenu from './taskMenu'
import moment from 'moment'

type Props = {
  task: TaskCalendarItemType
}

const TaskCard = ({ task }: Props) => {
  const [isEdit, setIsEdit] = useState({ title: false, description: false })
  const [dataValue, setDataValue] = useState(task.dateCreate)

  const [taskEdit, setTaskIsEdit] = useState(task)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  useEffect(() => {
    dispatch(changeTask(taskEdit))
  }, [taskEdit])
  const dispatch = useAppDispatch()
  // console.log(task.taskDate)
  const handleClick = () => {
    dispatch(deleteTask(task.id))
  }
  const handleEdit = (date: string | null) => {
    if (date)
      setTaskIsEdit((prevState) => ({
        ...prevState,
        dateCreate: moment(date).format('YYYY-MM-DD HH:mm'),
      }))
    // setIsEdit(!isEdit)
  }
  const handleDateChange = (date: string | null) => {
    if (date) setDataValue(date)
  }
  const handleIsDone = () => {
    // onDelete(task.id)
  }
  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }
  const handleCancel = (type: string) => {
    if (type) setIsEdit((prevState) => ({ ...prevState, [type]: false }))
  }
  const handleApprove = (type: string, value: string) => {
    setTaskIsEdit((prevState) => ({ ...prevState, [type]: value }))
    setIsEdit((prevState) => ({ ...prevState, [type]: false }))
  }
  const handleClickEdit = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const type = e.currentTarget.dataset.name
    console.log(type)
    if (type) setIsEdit((prevState) => ({ ...prevState, [type]: true }))
  }

  return (
    <Card className={styles.card}>
      <CardContent>
        <Stack direction='row' spacing={2}>
          <Checkbox
            sx={{ alignSelf: 'flex-start' }}
            inputProps={{ 'aria-label': 'task' }}
            onChange={handleIsDone}
            checked={taskEdit.isDone}
          />
          <Stack spacing={2} alignItems='flex-start' sx={{ width: '80%' }}>
            {isEdit.title ? (
              <TextFieldEdit
                dataName='title'
                label='Заголовок задачи'
                value={task.title}
                onAprove={handleApprove}
                onCancel={handleCancel}
              />
            ) : (
              <Typography data-name='title' onClick={handleClickEdit} variant='h5'>
                {task.title}
              </Typography>
            )}
            {isEdit.description ? (
              <TextFieldEdit
                align-self='stretch'
                dataName='description'
                label='Описание задачи'
                value={task.description || ''}
                onAprove={handleApprove}
                onCancel={handleCancel}
              />
            ) : task.description ? (
              <Typography data-name='description' onClick={handleClickEdit} alignSelf='flex-start'>
                {task.description}
              </Typography>
            ) : (
              <Chip
                data-name='description'
                variant='outlined'
                label='описание'
                onClick={handleClickEdit}
                // onDelete={showMenu}
                icon={<ControlPointIcon />}
              />
            )}
          </Stack>
          <Stack alignItems='flex-end'>
            <IconButton onClick={showMenu}>
              <MenuIcon />
            </IconButton>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
              <MobileDateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label='Дата'
                onAccept={handleEdit}
                onChange={handleDateChange}
                value={dataValue}
              />
            </LocalizationProvider>
            <TaskMenu open={open} anchorEl={anchorEl} closeMenu={closeMenu} />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick}>Удалить</Button>
      </CardActions>
    </Card>
  )
}
export default TaskCard
