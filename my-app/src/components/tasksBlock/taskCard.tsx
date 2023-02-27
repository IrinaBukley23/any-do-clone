import { Card, Chip, IconButton, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuItemType, Project, TaskCalendarItemType } from '../../types/types'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import styles from './tasksBlock.module.scss'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import React, { useEffect, useState } from 'react'
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import TextFieldEdit from '../ui/textFieldEdit/textFieldEdit'
import TaskMenu from './taskMenu'
import moment from 'moment'
import {
  Importance,
  ImportanceEn,
  TypeChip,
  typesStartTask,
  typesStartTaskEn,
} from '../../types/enum'
import { GetIcon } from './getIcon'
import { useTranslation } from 'react-i18next'
import { DialogConfirm } from '../ui/dialogConfirm'
import { useAppSelector } from '../../store/hooks'
import { projectSelectors } from '../../store/reducers/projectReducer'

type Props = {
  task: TaskCalendarItemType
  onDelete: (id: number) => void
  onChange: (task: TaskCalendarItemType) => void
}
const toMenuItems = (values: string[] | Project[]): MenuItemType[] => {
  const menuItems: MenuItemType[] = []
  values.map((value) => {
    typeof value == 'string'
      ? menuItems.push({ id: value, value: value })
      : menuItems.push({ id: value.id, value: value.name })
  })
  return menuItems
}

const TaskCard = ({ task, onDelete, onChange }: Props) => {
  const projectAll = useAppSelector((state) => projectSelectors.selectAll(state.project))
  const typesProj = toMenuItems(projectAll)

  const typesImportant = toMenuItems(Object.values(Importance))
  const typesImportantEn = toMenuItems(Object.values(ImportanceEn))
  const [typesStartTaskComm, setTypesStartTask] = useState<MenuItemType[]>(typesStartTask)

  const [isEdit, setIsEdit] = useState({ title: false, description: false })
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false)
  const [dataValue, setDataValue] = useState<string>('')
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([])
  const [project, setProject] = useState<Project | null>(null)
  const [taskEdit, setTaskIsEdit] = useState<TaskCalendarItemType>(task)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { lang } = useAppSelector((state) => state.lang)
  const [isOpen, setIsOpen] = useState(false)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  useEffect(() => {
    if (isNeedToUpdate) {
      onChange(taskEdit)
      setIsNeedToUpdate(false)
    }
  }, [isNeedToUpdate])
  useEffect(() => {
    if (lang == 'ru') {
      setTypesStartTask(typesStartTask)
    } else {
      setTypesStartTask(typesStartTaskEn)
    }
  }, [lang])
  useEffect(() => {
    setTaskIsEdit(task)
    setDataValue(moment(task.performDate).utc().format('YYYY-MM-DD HH:mm'))
    setProject(projectAll.find((project) => project.id == task.projectId) || null)
  }, [task, projectAll])
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
      setMenuItems(typesProj)
    } else if (e.currentTarget.dataset.name == TypeChip.important) {
      lang === 'ru' ? setMenuItems(typesImportant) : setMenuItems(typesImportantEn)
    } else {
      setMenuItems(typesStartTaskComm)
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
  const setColorImportance = () => {
    return taskEdit.tag == Importance.immediat || taskEdit.tag == ImportanceEn.immediat
      ? 'error'
      : taskEdit.tag == Importance.important || taskEdit.tag == ImportanceEn.important
      ? 'warning'
      : 'success'
  }
  const getImportance = () => {
    let res = null
    if (lang == 'ru') {
      taskEdit.tag == Importance.immediat || taskEdit.tag == ImportanceEn.immediat
        ? (res = Importance.immediat)
        : taskEdit.tag == Importance.important || taskEdit.tag == ImportanceEn.important
        ? (res = Importance.important)
        : (res = Importance.notImediat)
    } else {
      taskEdit.tag == Importance.immediat || taskEdit.tag == ImportanceEn.immediat
        ? (res = ImportanceEn.immediat)
        : taskEdit.tag == Importance.important || taskEdit.tag == ImportanceEn.important
        ? (res = ImportanceEn.important)
        : (res = ImportanceEn.notImediat)
    }

    return res
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
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
            <GetIcon status={taskEdit.status} />
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
                icon={<ControlPointIcon />}
              />
            )}
          </Stack>
          <Stack justifyContent='space-between' alignItems='flex-end'>
            <IconButton color='primary' onClick={handleOpen}>
              <DeleteIcon />
            </IconButton>
            <DialogConfirm isOpen={isOpen} handleClose={handleClose} handleRemove={handleDelete} />
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
            {project ? (
              <Chip
                data-name={TypeChip.project}
                variant='outlined'
                label={project.name}
                onClick={showMenu}
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
                label={getImportance()}
                onClick={showMenu}
                color={setColorImportance()}
                onDelete={() => deleteChip(TypeChip.important)}
              />
            ) : (
              <Chip
                data-name={TypeChip.important}
                variant='outlined'
                label={t('taskImportance')}
                onClick={showMenu}
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
