import { Card, Chip, IconButton, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import DeleteIcon from '@mui/icons-material/Delete'
import { State, TaskCalendarItemType } from '../../types/types'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import styles from './tasksBlock.module.scss'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import React, { useEffect, useState } from 'react'

import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import TextFieldEdit from '../ui/textFieldEdit/textFieldEdit'

import TaskMenu from './taskMenu'
import moment from 'moment'
import { setNestedObjectValues } from 'formik'
import {
  Importance,
  ImportanceEn,
  Projects,
  ProjectsEn,
  TypeChip,
  TypeStatusTask,
  TypeStatusTaskEn,
} from '../../types/enum'
import { GetIcon } from './getIcon'
import { setColor, setColorEn } from './utils'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

type Props = {
  task: TaskCalendarItemType
  onDelete: (id: number) => void
  onChange: (task: TaskCalendarItemType) => void
}

const TaskCard = ({ task, onDelete, onChange }: Props) => {
  const typesProj = Object.values(Projects)
  const typesProjEn = Object.values(ProjectsEn)
  const typesImportant = Object.values(Importance)
  const typesImportantEn = Object.values(ImportanceEn)
  const typesStartTask = Object.values(TypeStatusTask)
  const typesStartTaskEn = Object.values(TypeStatusTaskEn)
  const [isEdit, setIsEdit] = useState({ title: false, description: false })
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false)
  const [dataValue, setDataValue] = useState<string>('')
  const [menuItems, setMenuItems] = useState<string[]>([])
  const [taskEdit, setTaskIsEdit] = useState<TaskCalendarItemType>(task)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { lang } = useSelector((state: State) => state.lang)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  useEffect(() => {
    if (isNeedToUpdate) {
      onChange(taskEdit)
      setIsNeedToUpdate(false)
    }
  }, [isNeedToUpdate])

  useEffect(() => {
    setTaskIsEdit(task)
    setDataValue(moment(task.performDate).utc().format('YYYY-MM-DD HH:mm'))
  }, [task])
  useEffect(() => {
    setMenuItems(typesProj)
    setTaskIsEdit(task)
  }, [])

  const handleDelete = () => {
    onDelete(taskEdit.id)
  }

  const handleEdit = (date: string | null) => {
    if (date) {
      setTaskIsEdit((prevState) => ({
        ...prevState,
        performDate: moment(date).format('YYYY-MM-DD HH:mm'),
      }))
      setIsNeedToUpdate(true)
    }
  }
  const handleDateChange = (date: string | null) => {
    if (date) {
      setDataValue(date)
    }
  }

  const showMenu = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (e.currentTarget.dataset.name == TypeChip.project) {
      lang === 'ru' ? setMenuItems(typesProj) : setMenuItems(typesProjEn)
    } else if (e.currentTarget.dataset.name == TypeChip.important) {
      lang === 'ru' ? setMenuItems(typesImportant) : setMenuItems(typesImportantEn)
    } else {
      lang === 'ru' ? setMenuItems(typesStartTask) : setMenuItems(typesStartTaskEn)
    }

    setAnchorEl(e.currentTarget)
  }
  const aceptMenu = (value?: string) => {
    const field = anchorEl?.dataset.name
    console.log(field, value)
    if (field && value) {
      setTaskIsEdit((prevState) => ({
        ...prevState,
        [field]: value,
      }))
      setIsNeedToUpdate(true)
    }
    closeMenu()
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }
  const deleteChip = (field: string) => {
    setTaskIsEdit((prevState: TaskCalendarItemType) => ({ ...prevState, [field]: null }))
    setIsNeedToUpdate(true)
  }
  const handleCancel = (type: string) => {
    if (type) setIsEdit((prevState) => ({ ...prevState, [type]: false }))
  }
  const handleApprove = (type: string, value: string) => {
    setTaskIsEdit((prevState) => ({ ...prevState, [type]: value }))
    setIsEdit((prevState) => ({ ...prevState, [type]: false }))
    setIsNeedToUpdate(true)
  }
  const handleClickEdit = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const type = e.currentTarget.dataset.name

    if (type) {
      setIsEdit((prevState) => ({ ...prevState, [type]: true }))
    }
  }
  const setColorImportance = (lang: string) => {
    if (lang === 'ru') {
      return taskEdit.tag == Importance.immediat
        ? 'error'
        : taskEdit.tag == Importance.important
        ? 'warning'
        : 'success'
    } else {
      return taskEdit.tag == ImportanceEn.immediat
        ? 'error'
        : taskEdit.tag == ImportanceEn.important
        ? 'warning'
        : 'success'
    }
  }

  return (
    <Card className={styles.card}>
      <CardContent>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <IconButton
            sx={{ alignSelf: 'flex-start' }}
            onClick={showMenu}
            data-name={TypeChip.status}
          >
            <GetIcon status={taskEdit.status as TypeStatusTask} />
          </IconButton>

          <Stack spacing={2} alignItems='stretch' sx={{ width: '90%' }}>
            {isEdit.title ? (
              <TextFieldEdit
                dataName={TypeChip.title}
                label={t('taskTitle')}
                value={task.title}
                onAprove={handleApprove}
                onCancel={handleCancel}
              />
            ) : (
              <Typography
                align='left'
                data-name={TypeChip.title}
                onClick={handleClickEdit}
                variant='h5'
              >
                {task.title}
              </Typography>
            )}
            {isEdit.description ? (
              <TextFieldEdit
                align-self='stretch'
                dataName={TypeChip.description}
                label={t('taskDescr')}
                value={task.description || ''}
                onAprove={handleApprove}
                onCancel={handleCancel}
              />
            ) : task.description ? (
              <Typography
                align='left'
                data-name={TypeChip.description}
                onClick={handleClickEdit}
                alignSelf='flex-start'
              >
                {task.description}
              </Typography>
            ) : (
              <Chip
                sx={{ alignSelf: 'flex-start' }}
                data-name={TypeChip.description}
                variant='outlined'
                label={t('taskDescription')}
                onClick={handleClickEdit}
                // onDelete={showMenu}
                icon={<ControlPointIcon />}
              />
            )}
          </Stack>
          <Stack justifyContent='space-between' alignItems='flex-end'>
            <IconButton color='primary' onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: '1rem 2rem ' }}>
        <Stack
          spacing={2}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: '100%' }}
        >
          <Stack spacing={2} direction='row'>
            {taskEdit.project ? (
              <Chip
                data-name={TypeChip.project}
                variant='outlined'
                label={taskEdit.project}
                onClick={showMenu}
                color={
                  lang === 'ru'
                    ? setColor(taskEdit.project as Projects)
                    : setColorEn(taskEdit.project as ProjectsEn)
                }
                onDelete={() => deleteChip(TypeChip.project)}
              />
            ) : (
              <Chip
                data-name={TypeChip.project}
                variant='outlined'
                label={t('taskProj')}
                onClick={showMenu}
                icon={<ControlPointIcon />}
              />
            )}

            {taskEdit.tag ? (
              <Chip
                data-name={TypeChip.important}
                // variant='outlined'
                label={taskEdit.tag}
                onClick={showMenu}
                color={setColorImportance(lang)}
                onDelete={() => deleteChip(TypeChip.important)}
              />
            ) : (
              <Chip
                data-name={TypeChip.important}
                variant='outlined'
                label={t('taskImportance')}
                onClick={showMenu}
                // onDelete={showMenu}
                icon={<ControlPointIcon />}
              />
            )}
          </Stack>
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale={lang}
            sx={{ justifySelf: 'flex-start' }}
          >
            <MobileDateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label={t('taskDate')}
              onAccept={handleEdit}
              onChange={handleDateChange}
              value={dataValue}
            />
          </LocalizationProvider>
        </Stack>
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
