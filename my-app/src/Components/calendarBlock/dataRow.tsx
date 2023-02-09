import { TableCell, TableRow, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './datePlan.module.scss'

type Props = {
  hh: string
  mm: string
  task: string
  isEven: boolean
}
const DataRow = ({ hh, mm, task, isEven }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [taskSt, setTaskSt] = useState(task)

  const handleClick = () => {
    setIsEdit(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskSt(e.target.value)
  }
  const handleBlur = () => {
    setIsEdit(false)
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
          <></>
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
          <pre className={styles.text}>{taskSt}</pre>
        )}
      </TableCell>
    </TableRow>
  )
}
export default DataRow
