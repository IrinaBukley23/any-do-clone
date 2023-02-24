import { Card, TableCell, TableRow, TextField } from '@mui/material'
import { Moment } from 'moment'
import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { TypeStatusCommon, TypeStatusTask } from '../../types/enum'
import { TaskCalendarItemType } from '../../types/types'
import styles from './datePlan.module.scss'

type Props = {
  idRow: number
  time: Moment
  task: TaskCalendarItemType[]
  isEven: boolean
  changeTask: (task: TaskCalendarItemType) => void
}
const DataRow = ({ idRow, time, task, isEven, changeTask }: Props) => {
  const [changedTask, setchangedTask] = useState<TaskCalendarItemType | null>()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let newId = 0

    if (e.target instanceof HTMLDivElement && e.target.dataset.id) {
      newId = +e.target.dataset.id
      const findTask = task.find((currTask) => currTask.id == newId)
      if (findTask) setchangedTask({ ...findTask })
    } else {
      setchangedTask({
        id: newId,
        performDate: time.format('YYYY-MM-DD HH:mm'),
        title: '',
        status: TypeStatusCommon.notStart,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changedTask) {
      const currTask = { ...changedTask, title: e.target.value }
      setchangedTask(currTask)
    }
  }
  const handleBlur = () => {
    if (changedTask && changedTask.title.trim()) changeTask(changedTask)
    setchangedTask(null)
  }
  return (
    <TableRow sx={{ height: '2.5rem' }}>
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
            {/* <<<<<<< HEAD
            {task.map((t, index) =>
              isEdit[t.id] ? (
                <TextField
                  key={`${t.id}t`}
                  autoFocus
                  placeholder=''
                  sx={{ width: '100%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={changedTask?.title}
                  data-id={t.id}
                />
              ) : (
                <Draggable draggableId={t.id.toString()} index={index} key={t.id}>
                  {(draggableProvided) => (
                    <Card
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                      data-id={t.id}
                      // key={t.id}
                      className={styles.text}
                    >
                      {t.title}
                    </Card>
                  )}
                </Draggable>
              ),
======= */}
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
                  <>
                    {changedTask?.id != t.id && (
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
                  </>
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
