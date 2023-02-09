import { TableCell, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import styles from './datePlan.module.scss'

type Props = {
  hh: string
  mm: string
  task: string
  isEven: boolean
  changeTask: (value: string) => void
}
const DataRow = ({ hh, mm, task, isEven, changeTask }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [taskSt, setTaskSt] = useState(task)
  useEffect(() => setTaskSt(task), [task])

  const handleClick = () => {
    setIsEdit(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskSt(e.target.value)
  }
  const handleBlur = (e: unknown) => {
    console.log(e)

    setIsEdit(false)
    changeTask(taskSt)
  }
  return (
    <TableRow>
      <TableCell>
        {isEven ? (
          <>
            <strong>{hh}</strong>
            <sup>{mm}</sup>
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
            value={taskSt}
          />
        ) : (
          <p className={styles.text}>{taskSt}</p>
        )}
      </TableCell>
    </TableRow>
  )
}
export default DataRow
