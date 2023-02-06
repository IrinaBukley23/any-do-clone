import { TableBody, TableContainer, TableHead } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack/Stack'
import Table from '@mui/material/Table'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import styles from './datePlan.module.scss'
import moment from 'moment'
import DataRow from './dataRow'

const generateTime = () => {
  const arr = []
  // const date= new Date()
  for (let t = 7; t <= 20; t++) {
    arr.push({ id: t, time: moment().hour(t).minutes(0), task: '' })
    arr.push({ id: t + 30, time: moment().hour(t).minutes(30), task: ' ' })
  }
  return arr
}

const tasks = [
  {
    id: 1,
    title: 'Task1',
    description: 'Description1',
    people: [],
    date: moment('2023-03-06 15:30'),
  },
  {
    id: 2,
    title: 'Task2',
    description: 'Description2',
    people: [],
    date: moment('02.06.22 12:30').toDate(),
  },
  {
    id: 3,
    title: 'Task3',
    description: 'Description3',
    people: [],
    date: moment('02.06.22 11:30').toDate(),
  },
]

const DatePlan = () => {
  return (
    <Paper className={styles.aside}>
      <Stack className={styles.content}>
        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <IconButton>
            <ArrowLeftIcon />
          </IconButton>
          <p>{moment().format('DD.MM.yyyy')}</p>

          <IconButton>
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
            <TableBody>
              {generateTime().map((row, index) => (
                <DataRow
                  key={row.id}
                  hh={row.time.format('HH')}
                  mm={row.time.format('mm')}
                  task={row.task}
                  isEven={index % 2 === 0}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  )
}
export default DatePlan
