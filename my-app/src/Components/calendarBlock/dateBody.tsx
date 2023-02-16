import { TableBody } from '@mui/material'
import DataRow from './dataRow'
import { TaskCalendarItemType, TimeCalendar } from '../../types/types'

type Props = {
  listTasks: TimeCalendar[]
  changeTask: (task: TaskCalendarItemType) => void
}
export const DateBody = ({ listTasks, changeTask }: Props) => {
  const handleChahgeTask = (value: TaskCalendarItemType) => {
    changeTask(value)
  }

  return (
    <TableBody>
      {listTasks.map((row, index) => (
        <DataRow
          key={row.id}
          idRow={row.id}
          time={row.time}
          task={row.task}
          isEven={index % 2 !== 0}
          changeTask={handleChahgeTask}
        />
      ))}
    </TableBody>
  )
}
