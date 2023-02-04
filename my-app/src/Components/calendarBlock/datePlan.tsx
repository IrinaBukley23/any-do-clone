import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack/Stack'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import styles from './datePlan.module.scss'
import moment from 'moment'

const generateTime = () => {
  const arr = []
  // const date= new Date()
  for (let t = 7; t <= 20; t++) {
    arr.push({ id: 1, time: moment().hour(t).minutes(0), task: '' })
    arr.push({ id: 1, time: moment().hour(t).minutes(30), task: ' ' })
  }
  return arr
}

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
        <Paper className={styles.table}>
          <Table size='small'>
            <TableHead></TableHead>
            <TableBody>
              {generateTime().map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {index % 2 === 0 ? (
                      <>
                        <strong>{row.time.format('HH')}</strong>
                        <sup>{row.time.format('mm')}</sup>
                      </>
                    ) : (
                      <p></p>
                    )}
                  </TableCell>
                  <TableCell>{row.task}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </Paper>
  )
}
export default DatePlan
