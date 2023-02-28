import { TableBody } from '@mui/material'
import DataRow from './dataRow'
import { TaskCalendarItemType, TimeCalendar } from '../../types/types'
import moment, { Moment } from 'moment'
type Props = {
  listTasks: TimeCalendar[]
  taskListInPlan: TaskCalendarItemType[]
  changeTask: (task: TaskCalendarItemType) => void
}

const roundMin = (date: string) =>
  moment(date).minute() >= 30 ? moment(date).minute(30).second(0) : moment(date).minute(0).second(0)

export const DateBody = ({ listTasks, taskListInPlan, changeTask }: Props) => {
  const handleChahgeTask = (value: TaskCalendarItemType) => {
    changeTask(value)
  }
  const filterTask = (rowTime: Moment): TaskCalendarItemType[] => {
    const filtered = [...taskListInPlan].filter((task) => {
      const round = roundMin(task.performDate).utc()

      return rowTime.minutes() == round.minutes() && rowTime.hours() == round.hours()
    })

    return filtered
  }

  return (
    <TableBody>
      {listTasks.map((row, index) => (
        <DataRow
          key={row.id}
          idRow={row.id}
          time={row.time}
          task={filterTask(row.time)}
          isEven={index % 2 !== 0}
          changeTask={handleChahgeTask}
        />
      ))}
    </TableBody>
  )
}
