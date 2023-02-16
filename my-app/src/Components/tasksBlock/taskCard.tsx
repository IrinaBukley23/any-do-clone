import { Card, Chip, IconButton, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Button from '@mui/material/Button'

import { TaskCalendarItemType } from '../../types/types'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import styles from './tasksBlock.module.scss'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import React, { useEffect, useState } from 'react'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import TextFieldEdit from '../UI/textFieldEdit/textFieldEdit'
import PausePresentationIcon from '@mui/icons-material/PausePresentation'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import TaskMenu from './taskMenu'
import moment from 'moment'
import { Importance, Projects, TypeChip, TypeStatusTask } from '../../types/enum'

const setColor = (project: Projects) => {
  switch (project) {
    case Projects.health:
      return 'success'
    case Projects.buiseness:
      return 'error'
    case Projects.family:
      return 'warning'
    case Projects.journey:
      return 'secondary'
    case Projects.hobby:
      return 'primary'
  }
}
const GetIcon = ({ status }: { status: TypeStatusTask }) => {
  switch (status) {
    case TypeStatusTask.notStart:
      return <CheckBoxOutlineBlankIcon />
    case TypeStatusTask.start:
      return <SlideshowOutlinedIcon />
    case TypeStatusTask.pause:
      return <PausePresentationIcon />

    case TypeStatusTask.cancel:
      return <DisabledByDefaultOutlinedIcon />
    case TypeStatusTask.done:
      return <CheckBoxOutlinedIcon />
  }
}

type Props = {
  task: TaskCalendarItemType
  onDelete: (id: number) => void
  onChange: (task: TaskCalendarItemType) => void
}

const TaskCard = ({ task, onDelete, onChange }: Props) => {
  const typesProj = Object.values(Projects)
  const typesImportant = Object.values(Importance)
  const typesStartTask = Object.values(TypeStatusTask)
  const [isEdit, setIsEdit] = useState({ title: false, description: false })
  const [dataValue, setDataValue] = useState<string>('')
  const [menuItems, setMenuItems] = useState<string[]>([])
  const [taskEdit, setTaskIsEdit] = useState<TaskCalendarItemType>(task)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  useEffect(() => {
    onChange(taskEdit)
  }, [taskEdit])

  useEffect(() => {
    setTaskIsEdit(task)
    setDataValue(task.dateCreate)
  }, [task])
  useEffect(() => {
    setMenuItems(typesProj)
    setTaskIsEdit(task)
  }, [])

  const handleDelete = () => {
    onDelete(taskEdit.id)
  }

  const handleEdit = (date: string | null) => {
    if (date)
      setTaskIsEdit((prevState) => ({
        ...prevState,
        dateCreate: moment(date).format('YYYY-MM-DD HH:mm'),
      }))
  }
  const handleDateChange = (date: string | null) => {
    if (date) {
      setDataValue(date)
    }
  }

  const showMenu = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (e.currentTarget.dataset.name == TypeChip.project) {
      setMenuItems(typesProj)
    } else if (e.currentTarget.dataset.name == TypeChip.important) {
      setMenuItems(typesImportant)
    } else {
      setMenuItems(typesStartTask)
    }

    setAnchorEl(e.currentTarget)
  }
  const aceptMenu = (value?: string) => {
    const field = anchorEl?.dataset.name
    if (field && value) {
      setTaskIsEdit((prevState) => ({
        ...prevState,
        [field]: value,
      }))
    }
    closeMenu()
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }
  const deleteChip = (field: string) => {
    setTaskIsEdit((prevState: TaskCalendarItemType) => ({ ...prevState, [field]: null }))
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

    if (type) {
      setIsEdit((prevState) => ({ ...prevState, [type]: true }))
    }
  }

  return (
    <Card className={styles.card}>
      <CardContent>
        <Stack direction='row' spacing={2}>
          <IconButton
            sx={{ alignSelf: 'flex-start' }}
            onClick={showMenu}
            data-name={TypeChip.status}
          >
            <GetIcon status={taskEdit.status} />
          </IconButton>
          <Stack spacing={2} alignItems='flex-start' sx={{ width: '80%' }}>
            {isEdit.title ? (
              <TextFieldEdit
                dataName={TypeChip.title}
                label='Заголовок задачи'
                value={task.title}
                onAprove={handleApprove}
                onCancel={handleCancel}
              />
            ) : (
              <Typography data-name={TypeChip.title} onClick={handleClickEdit} variant='h5'>
                {task.title}
              </Typography>
            )}
            {isEdit.description ? (
              <TextFieldEdit
                align-self='stretch'
                dataName={TypeChip.description}
                label='Описание задачи'
                value={task.description || ''}
                onAprove={handleApprove}
                onCancel={handleCancel}
              />
            ) : task.description ? (
              <Typography
                data-name={TypeChip.description}
                onClick={handleClickEdit}
                alignSelf='flex-start'
              >
                {task.description}
              </Typography>
            ) : (
              <Chip
                data-name={TypeChip.description}
                variant='outlined'
                label='описание'
                onClick={handleClickEdit}
                // onDelete={showMenu}
                icon={<ControlPointIcon />}
              />
            )}
          </Stack>
          <Stack alignItems='flex-end' spacing={2}>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
              <MobileDateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label='Дата'
                onAccept={handleEdit}
                onChange={handleDateChange}
                value={dataValue}
              />
            </LocalizationProvider>
            {taskEdit.project ? (
              <Chip
                data-name={TypeChip.project}
                variant='outlined'
                label={taskEdit.project}
                onClick={showMenu}
                color={setColor(taskEdit.project as Projects)}
                onDelete={() => deleteChip(TypeChip.project)}
              />
            ) : (
              <Chip
                data-name={TypeChip.project}
                variant='outlined'
                label='проект'
                onClick={showMenu}
                icon={<ControlPointIcon />}
              />
            )}
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleDelete}>Удалить</Button>
        {taskEdit.important ? (
          <Chip
            data-name={TypeChip.important}
            // variant='outlined'
            label={taskEdit.important}
            onClick={showMenu}
            color={
              taskEdit.important == Importance.immediat
                ? 'error'
                : taskEdit.important == Importance.important
                ? 'warning'
                : 'success'
            }
            onDelete={() => deleteChip(TypeChip.important)}
          />
        ) : (
          <Chip
            data-name={TypeChip.important}
            variant='outlined'
            label='важность'
            onClick={showMenu}
            // onDelete={showMenu}
            icon={<ControlPointIcon />}
          />
        )}
      </CardActions>
      <TaskMenu
        open={open}
        anchorEl={anchorEl}
        closeMenu={closeMenu}
        values={menuItems}
        aceptMenu={aceptMenu}
      />
    </Card>
  )
}
export default TaskCard
