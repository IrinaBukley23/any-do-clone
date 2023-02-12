import { TableCell, TableRow, TextField } from '@mui/material'
import { Moment } from 'moment'
import { useEffect, useState } from 'react'
import { TaskCalendarItemType } from '../../types/types'
import styles from './datePlan.module.scss'

type Props = {
  time: Moment
  task?: TaskCalendarItemType
  isEven: boolean
  changeTask: (task: TaskCalendarItemType) => void
}
const DataRow = ({ time, task, isEven, changeTask }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [taskSt, setTaskSt] = useState(task)
  useEffect(() => setTaskSt(task), [task])

  const handleClick = () => {
    setIsEdit(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!task) {
      console.log(time)
      setTaskSt({
        id: +new Date(),
        dateCreate: time.format('YYYY-MM-DD HH:mm'),
        title: e.target.value,
      })
    } else {
      setTaskSt((prevState) => {
        if (prevState) return { ...prevState, title: e.target.value }
      })
    }
  }
  const handleBlur = (e: unknown) => {
    console.log(e)

    setIsEdit(false)
    if (taskSt) changeTask(taskSt)
  }
  return (
    <TableRow>
      <TableCell>
        {isEven ? (
          <>
            <strong>{time.format('HH')}</strong>
            <sup>{time.format('mm')}</sup>
          </>
        ) : (
          <p></p>
        )}
      </TableCell>
      <TableCell onDoubleClick={handleClick}>
        {isEdit ? (
          <TextField
            multiline
            autoFocus
            sx={{ width: '100%' }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={taskSt?.title || ''}
          />
        ) : (
          <p className={styles.text}>{taskSt?.title}</p>
        )}
      </TableCell>
    </TableRow>
  )
}
export default DataRow
