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
import { calendarActions } from '../../store/reducers/calendarReducer'
import { useEffect, useState } from 'react'
import { TaskCalendarItemType, TimeCalendar } from '../../types/types'
import { DateBody } from './dateBody'


const generateTime = (date: string, tasks: TaskCalendarItemType[]): TimeCalendar[] => {
  const arr: TimeCalendar[] = []

  for (let t = 7; t <= 20; t++) {
    arr.push({
      id: t,
      time: moment(date).hour(t).minutes(0),
    })
    arr.push({ id: t + 30, time: moment(date).hour(t).minutes(30) })
  }
  const roundMin = (date: string) => moment(date).minute() % 30
  tasks.forEach((task) => {
    const findTask = arr.find((elem) =>
      elem.time.isSame(moment(task.dateCreate).add(roundMin(task.dateCreate), 'minutes')),
    )

    if (findTask) findTask.task = task
  })

  return arr
}

const DatePlan = () => {
  const { dateSelectedInPlan, taskListInPlan } = useAppSelector((state) => state.calendar)
  const [listTasks, setListTasks] = useState([] as TimeCalendar[])
  const dispatch = useAppDispatch()
  const handleLeft = () => {
  
    dispatch(
      calendarActions.setDateSelectedInPlan(
        moment(dateSelectedInPlan).add(1, 'd').format('YYYY-MM-DD hh:mm'),
      ),
    )
  }
  useEffect(() => {
    const list = generateTime(dateSelectedInPlan, [...taskListInPlan])

    setListTasks([...list])
  }, [taskListInPlan])

  const handleRight = () => {
    dispatch(
      calendarActions.setDateSelectedInPlan(
        moment(dateSelectedInPlan).subtract(1, 'd').format('YYYY-MM-DD hh:mm'),
      ),
    )
  }
  const handleChahgeTask = (value: string) => {
    // dispatch(calendarActions.changeTask(value, id))
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
        <TableContainer component={Paper} className={styles.table}>
          <Table size='small'>
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '90%' }} />
            </colgroup>
            <TableHead></TableHead>
            <DateBody listTasks={listTasks} changeTask={handleChahgeTask} />
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  )
}
export default DatePlan
