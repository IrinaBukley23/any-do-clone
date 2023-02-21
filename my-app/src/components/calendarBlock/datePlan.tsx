import { TableContainer, TableHead } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack/Stack'
import Table from '@mui/material/Table'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import styles from './datePlan.module.scss'
import moment from 'moment'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { TaskCalendarItemType, TimeCalendar } from '../../types/types'
import { DateBody } from './dateBody'
import { changeTask, setDateSelectedInPlan } from '../../store/actions/actionCalendar'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const generateTime = (date: string): TimeCalendar[] => {
  const arr: TimeCalendar[] = []
  arr.push({
    id: 0,
    time: moment(date).hour(0).minutes(0),
  })
  for (let t = 7; t <= 20; t++) {
    arr.push({
      id: t,
      time: moment(date).hour(t).minutes(0),
    })
    arr.push({ id: t + 30, time: moment(date).hour(t).minutes(30) })
  }

  return arr
}

const DatePlan = () => {
  const { dateSelectedInPlan, taskListInPlan } = useAppSelector((state) => state.calendar)
  const { key } = useAppSelector((state) => state.authorization)
  const [listTasks, setListTasks] = useState([] as TimeCalendar[])
  const dispatch = useAppDispatch()
  const handleLeft = () => {
    dispatch(
      setDateSelectedInPlan(moment(dateSelectedInPlan).add(1, 'd').format('YYYY-MM-DD HH:mm')),
    )
  }
  useEffect(() => {
    const list = generateTime(dateSelectedInPlan)

    setListTasks([...list])
  }, [dateSelectedInPlan])

  const handleRight = () => {
    dispatch(
      setDateSelectedInPlan(moment(dateSelectedInPlan).subtract(1, 'd').format('YYYY-MM-DD HH:mm')),
    )
  }
  const handleChahgeTask = (task: TaskCalendarItemType) => {
    console.log('change task')
    // dispatch(changeTask(task, key))
  }
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    )
      return
    const destinationTimeCell: TimeCalendar = listTasks.find(
      (task) => task.id == +destination.droppableId,
    ) as TimeCalendar

    const taskList = taskListInPlan.find((task: TaskCalendarItemType) => +draggableId === task.id)
    if (taskList) {
      handleChahgeTask({
        ...taskList,
        performDate: destinationTimeCell.time.format('YYYY-MM-DD HH:mm'),
      })
    }
  }

  return (
    <Paper className={styles.aside}>
      <Stack className={styles.content}>
        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <IconButton onClick={handleRight}>
            <ArrowLeftIcon />
          </IconButton>
          <p>{moment(dateSelectedInPlan).format('DD.MM.yyyy')}</p>

          <IconButton onClick={handleLeft}>
            <ArrowRightIcon />
          </IconButton>
        </Stack>
        <DragDropContext onDragEnd={handleDragEnd}>
          <TableContainer component={Paper} className={styles.table}>
            <Table size='small'>
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '90%' }} />
              </colgroup>
              <TableHead></TableHead>
              <DateBody
                listTasks={listTasks}
                taskListInPlan={taskListInPlan}
                changeTask={handleChahgeTask}
              />
            </Table>
          </TableContainer>
        </DragDropContext>
      </Stack>
    </Paper>
  )
}
export default DatePlan
