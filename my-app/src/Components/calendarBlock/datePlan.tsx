import { TableBody, TableContainer, TableHead } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack/Stack'
import Table from '@mui/material/Table'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import styles from './datePlan.module.scss'
import moment, { Moment } from 'moment'
import DataRow from './dataRow'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { calendarActions } from '../../store/reducers/calendarReducer'
import { useEffect, useState } from 'react'
import { TaskCalendarItemType } from '../../types/types'
import { DateBody } from './dateBody'

type timeCalendar = {
  id: number
  time: Moment
  task: string
}
const generateTime = (date: string, tasks: TaskCalendarItemType[]): timeCalendar[] => {
  const arr: timeCalendar[] = []
  // const date= new Date()
  for (let t = 7; t <= 20; t++) {
    arr.push({
      id: t,
      time: moment(date).hour(t).minutes(0),
      task: '',
    })
    arr.push({ id: t + 30, time: moment(date).hour(t).minutes(30), task: ' ' })
  }
  const roundMin = (date: string) => moment(date).minute() % 30
  tasks.forEach((task) => {
    const findTask = arr.find((elem) =>
      elem.time.isSame(moment(task.dateCreate).add(roundMin(task.dateCreate), 'minutes')),
    )

    if (findTask) findTask.task = task.title
  })

  return arr
}

const DatePlan = () => {
  const { dateSelectedInPlan, taskListInPlan } = useAppSelector((state) => state.calendar)
  const [listTasks, setListTasks] = useState([] as timeCalendar[])
  const dispatch = useAppDispatch()
  const handleLeft = () => {
    dispatch(
      calendarActions.setDateSelectedInPlan(
        moment(dateSelectedInPlan).add(1, 'd').format('YYYY-MM-DD hh:mm'),
      ),
    )
  }
  useEffect(() => {
    const list = generateTime(dateSelectedInPlan, taskListInPlan)

    setListTasks([...list])
  }, [dateSelectedInPlan])
  const handleRight = () => {
    dispatch(
      calendarActions.setDateSelectedInPlan(
        moment(dateSelectedInPlan).subtract(1, 'd').format('YYYY-MM-DD hh:mm'),
      ),
    )
  }
  // const getTimeTask=(row:{id:number, time:Date, task:''})=>{

  //   taskListInPlan.filter((task)=> moment(task.dateCreate).isSame(row.))
  // }
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
            <DateBody listTasks={listTasks} />
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  )
}
export default DatePlan
