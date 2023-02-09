import { TableBody } from '@mui/material'
import DataRow from './dataRow'
import { Moment } from 'moment'

type timeCalendar = {
  id: number
  time: Moment
  task: string
}

type Props = {
  listTasks: timeCalendar[]
}
export const DateBody = ({ listTasks }: Props) => {
  return (
    <TableBody>
      {listTasks.map((row, index) => (
        <DataRow
          key={row.id}
          hh={row.time.format('HH')}
          mm={row.time.format('mm')}
          task={row.task}
          isEven={index % 2 === 0}
        />
      ))}
    </TableBody>
  )
}
