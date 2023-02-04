import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack/Stack'
import Table from '@mui/material/Table'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import styles from './datePlan.module.scss'

const generateTime = () => {
  const arr = []
  for (let t = 7; t <= 20; t++) {
    arr.push({ id: 1, time: t, task: '' })
    arr.push({ id: 1, time: t, task: '' })
  }
  return arr
}

const DatePlan = () => {
  return (
    <Paper className={styles.aside}>
      <Stack direction='row' spacing={2}>
        <IconButton>
          <ArrowLeftIcon />
        </IconButton>

        <IconButton>
          <ArrowRightIcon />
        </IconButton>
      </Stack>
      <Table>
        <TableHead></TableHead>
        <TableBody>
          {generateTime().map((row) => (
            <TableRow hover key={row.time}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.task}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
export default DatePlan
