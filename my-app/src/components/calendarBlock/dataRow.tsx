import { Card, TableCell, TableRow, TextField } from '@mui/material'
import { Moment } from 'moment'
import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { TypeStatusTask } from '../../types/enum'
import { TaskCalendarItemType } from '../../types/types'
import styles from './datePlan.module.scss'
interface IIsEdit {
  [id: string]: boolean
}
type Props = {
  idRow: number
  time: Moment
  task: TaskCalendarItemType[]
  isEven: boolean
  changeTask: (task: TaskCalendarItemType) => void
}
const DataRow = ({ idRow, time, task, isEven, changeTask }: Props) => {
  const [isEdit, setIsEdit] = useState<IIsEdit>({})
  const [id, setId] = useState(0)
  const [changedTask, setchangedTask] = useState<TaskCalendarItemType | null>()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let newId = +new Date()

    if (e.target instanceof HTMLDivElement && e.target.dataset.id) {
      newId = +e.target.dataset.id
      console.log('dgdfhhgjkl', e.target)
      const findTask = task.find((currTask) => currTask.id == newId)
      console.log(findTask)
      if (findTask) setchangedTask({ ...findTask })
    } else {
      setchangedTask({
        id: newId,
        performDate: time.format('YYYY-MM-DD HH:mm'),
        title: '',
        status: TypeStatusTask.notStart,
      })
    }

    setIsEdit((prevState) => ({ ...prevState, [newId]: true }))

    setId(newId)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changedTask) {
      const currTask = { ...changedTask, title: e.target.value }
      setchangedTask(currTask)
    }
  }
  const handleBlur = () => {
    setIsEdit((prevState) => ({ ...prevState, [id]: false }))
    if (changedTask && changedTask.title.trim()) changeTask(changedTask)
    setchangedTask(null)
    setId(0)
  }
  return (
    <TableRow sx={{ height: '2rem' }}>
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
      <Droppable droppableId={idRow.toString()}>
        {(droppableProvided, droppableSnapshot) => (
          <TableCell
            onDoubleClick={handleClick}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {changedTask && (
              <TextField
                key={`${changedTask.id}t`}
                autoFocus
                placeholder=''
                sx={{ width: '100%' }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={changedTask.title}
                data-id={changedTask.id}
              />
            )}
            {task.map((t, index) => (
              <Draggable draggableId={t.id.toString()} index={index} key={t.id}>
                {(draggableProvided) => (
                  <Card
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    ref={draggableProvided.innerRef}
                    data-id={t.id}
                    className={styles.text}
                  >
                    {t.title}
                  </Card>
                )}
              </Draggable>
            ))}

            {droppableProvided.placeholder}
          </TableCell>
        )}
      </Droppable>
    </TableRow>
  )
}
export default DataRow
