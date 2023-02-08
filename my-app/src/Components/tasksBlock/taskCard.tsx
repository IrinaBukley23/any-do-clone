import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { TaskCalendarItemType } from '../../types/types'
import { Stack } from '@mui/system'
import Typography from '@mui/material/Typography'
import styles from './tasksBlock.module.scss'

type Props = {
  task: TaskCalendarItemType
}

const TaskCard = ({ task }: Props) => {
  // console.log(task.taskDate)
  return (
    <Card className={styles.card}>
      <CardContent>
        <Stack direction='row'>
          <Checkbox inputProps={{ 'aria-label': 'task' }} checked={task.isDone} />
          <Typography variant='h5'>{task.title}</Typography>
        </Stack>
        <Typography>{task.description}</Typography>
        <p>{task.dateStart}</p>
      </CardContent>

      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  )
}
export default TaskCard