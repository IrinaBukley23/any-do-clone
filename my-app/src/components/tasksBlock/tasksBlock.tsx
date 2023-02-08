import styles from './tasksBlock.module.scss'

import Stack from '@mui/material/Stack'

import Task from './task'

const tasks = [
  {
    id: 1,
    title: 'Task1',
    description: 'Description1',
    people: [],
  },
  {
    id: 2,
    title: 'Task2',
    description: 'Description2',
    people: [],
  },
  {
    id: 3,
    title: 'Task3',
    description: 'Description3',
    people: [],
  },
]
const TasksBlock = () => {
  return (
    <Stack spacing={2} className={styles.central} p={2}>
      {tasks.map((task) => (
        <Task key={task.id} />
      ))}
    </Stack>
  )
}

export default TasksBlock
