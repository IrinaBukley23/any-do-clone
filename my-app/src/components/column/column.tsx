import './column.scss'
import React, { useState } from 'react'
import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { ColumnItemType, ITask, State, TaskItemType } from '../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  editColumnTitle,
  setCurrentColumnId,
  setCurrentId,
  setRemoveColumn,
  sortTaskList,
} from '../../store/actions/actionCreators'
import CancelIcon from '@mui/icons-material/Cancel'
import Task from '../task/task'
import { DialogConfirm } from '../ui/dialogConfirm'
import ResponsiveDialog from '../ui/openDialog'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import { useTranslation } from 'react-i18next'

interface IProps {
  columnItem: ColumnItemType
  taskOnDrag: ITask | undefined
  onTaskOnDragChange: (task: ITask | undefined) => void
}

const Column = (props: IProps) => {
  const [open, setOpen] = useState(false)
  const [isTaskModal, setIsTaskModal] = useState(false)
  const { columnTitle, columnId } = props.columnItem
  const dispatch = useDispatch()
  const { taskList } = useSelector((state: State) => state.task)
  const taskQuantity = taskList.length
  const { t } = useTranslation()
  const [isEdit, setIsEdit] = useState(false)
  const [correctedTitle, setCorrectedTitle] = useState(columnTitle)

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectedTitle(e.target.value)
  }

  const handleSave = () => {
    setIsEdit(false)
    dispatch(editColumnTitle(columnId, correctedTitle))
  }

  const handleCancel = () => {
    setIsEdit(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTaskFormOpen = (e: React.SyntheticEvent) => {
    const targetId = ((e.target as HTMLElement).closest('div') as HTMLElement).id
    dispatch(setCurrentId(targetId))
    setIsTaskModal(true)
  }
  const handleTaskFormClose = () => {
    setIsTaskModal(false)
  }

  const handleRemove = () => {
    dispatch(setRemoveColumn(columnId))
    setOpen(false)
  }

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, task: ITask): void {
    props.onTaskOnDragChange(task)
    // setCurrentTask(task);
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    ;(e.target as HTMLDivElement).style.boxShadow = '0 2 px 3px gray'
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    ;(e.target as HTMLDivElement).style.boxShadow = 'none'
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, task: TaskItemType): void {
    if (!props.taskOnDrag) return
    e.preventDefault()
    if (task.currentColumnId === props.taskOnDrag.currentColumnId) {
      dispatch(sortTaskList([...taskList], task, props.taskOnDrag))
    } else {
      dispatch(setCurrentColumnId(task.currentColumnId))
      dispatch(
        sortTaskList([...taskList], task, {
          ...props.taskOnDrag,
          currentColumnId: task.currentColumnId,
        }),
      )
    }
    props.onTaskOnDragChange(undefined)
    ;(e.target as HTMLDivElement).style.boxShadow = 'none'
  }

  const sortTasks = (task1: TaskItemType, task2: TaskItemType) => task1.taskOrder - task2.taskOrder

  return (
    <div id={columnId} className='column'>
      {!isEdit && (
        <Typography variant='h5' className='column__title' onDoubleClick={handleEdit}>
          {columnTitle}
        </Typography>
      )}
      {isEdit && (
        <div className='column__edit'>
          <TextField
            id='outlined-basic'
            label=''
            variant='outlined'
            placeholder=''
            value={correctedTitle}
            onChange={handleCorrect}
            sx={{ width: '160px' }}
          />
          <IconButton color='success' onClick={handleSave}>
            <DownloadDoneIcon />
          </IconButton>
          <CancelIcon onClick={handleCancel} sx={{ color: '#d3586c', ml: '10px' }}></CancelIcon>
        </div>
      )}
      <Typography variant='h5' component='p' sx={{ fontSize: '14px', textAlign: 'left' }}>
        {t('columnCards')} - {taskQuantity}
      </Typography>
      <div>
        <Tooltip title={t('columnDel')}>
          <IconButton
            onClick={handleOpen}
            sx={{ position: 'absolute', top: '5px', right: '5px', color: '#ab45fa' }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <DialogConfirm isOpen={open} handleClose={handleClose} handleRemove={handleRemove} />
      </div>
      <div className='column__wrapper'>
        {[...taskList]
          ?.filter((task) => task.currentColumnId === columnId)
          .sort(sortTasks)
          .map((task, i) => (
            <div
              key={i}
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, task)}
              onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
              onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
              onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, task)}
              draggable={true}
            >
              <Task key={i} taskItem={task} />
            </div>
          ))}
      </div>
      <Button
        onClick={handleTaskFormOpen}
        color='primary'
        variant='contained'
        sx={{ height: '40px', mt: '30px', cursor: 'pointer' }}
      >
        {t('columnAddTask')}
      </Button>
      <ResponsiveDialog isOpen={isTaskModal} handleClose={handleTaskFormClose} />
    </div>
  )
}

export default Column
