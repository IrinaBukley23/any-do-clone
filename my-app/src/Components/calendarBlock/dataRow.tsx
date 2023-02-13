import { TableCell, TableRow, TextField } from '@mui/material'
import { Moment } from 'moment'
import { useEffect, useState } from 'react'
import { TaskCalendarItemType } from '../../types/types'
import styles from './datePlan.module.scss'
interface IIsEdit {
  [id: string]: boolean
}
type Props = {
  time: Moment
  task: TaskCalendarItemType[]
  isEven: boolean
  changeTask: (task: TaskCalendarItemType) => void
}
const DataRow = ({ time, task, isEven, changeTask }: Props) => {
  const [isEdit, setIsEdit] = useState<IIsEdit>({})
  const [taskSt, setTaskSt] = useState(task)
  const [id, setId] = useState(0)
  useEffect(() => setTaskSt(task), [task])

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    let newId = +new Date()
    if (e.target instanceof HTMLParagraphElement && e.target.dataset.id) {
      newId = +e.target.dataset.id
    } else {
      setTaskSt((prevState) => [
        ...prevState,
        {
          id: newId,
          dateCreate: time.format('YYYY-MM-DD HH:mm'),
          title: '',
        },
      ])
    }

    setIsEdit((prevState) => ({ ...prevState, [newId]: true }))

    setId(newId)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!taskSt) {
    //   setId(+new Date())
    //   setTaskSt([
    //     {
    //       id: id,
    //       dateCreate: time.format('YYYY-MM-DD HH:mm'),
    //       title: e.target.value,
    //     },
    //   ])
    // } else {
    const newStateTask = JSON.parse(JSON.stringify(taskSt))
    const currTask: TaskCalendarItemType = newStateTask.find(
      (t: TaskCalendarItemType) => t.id == id,
    )

    if (currTask) {
      console.log(currTask)
      currTask.title = e.target.value
      setTaskSt(newStateTask)
    } else {
      setTaskSt((prevState) => [
        ...prevState,
        {
          id: id,
          dateCreate: time.format('YYYY-MM-DD HH:mm'),
          title: e.target.value,
        },
      ])
    }
  }
  const handleBlur = () => {
    setIsEdit((prevState) => ({ ...prevState, [id]: false }))
    const newStateTask = JSON.parse(JSON.stringify(taskSt))
    const currTask: TaskCalendarItemType = newStateTask.find(
      (t: TaskCalendarItemType) => t.id == id,
    )

    if (currTask?.title) changeTask(currTask)
    setId(0)
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
        {taskSt.map((t) =>
          isEdit[t.id] ? (
            <TextField
              key={`${t.id}t`}
              autoFocus
              sx={{ width: '100%' }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={t.title || ''}
              data-id={t.id}
            />
          ) : (
            <p data-id={t.id} key={t.id} className={styles.text}>
              {t.title}
            </p>
          ),
        )}
      </TableCell>
    </TableRow>
  )
}
export default DataRow
