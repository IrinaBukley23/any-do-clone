import { TableBody } from '@mui/material'
import DataRow from './dataRow'
import { TimeCalendar } from '../../types/types'

type Props = {
  listTasks: TimeCalendar[]
  changeTask: (value: string, id?: number) => void
}
export const DateBody = ({ listTasks, changeTask }: Props) => {
  const handleChahgeTask = (value: string) => {
    changeTask(value)
  }

  return (
    <TableBody>
      {listTasks.map((row, index) => (
        <DataRow
          key={row.id}
          hh={row.time.format('HH')}
          mm={row.time.format('mm')}
          task={row.task?.title || ' '}
          isEven={index % 2 === 0}
          changeTask={handleChahgeTask}
        />
      ))}
    </TableBody>
  )
}
