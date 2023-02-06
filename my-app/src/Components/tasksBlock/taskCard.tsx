import { Card, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { Task } from '../../utils/types'
import { Stack } from '@mui/system'

type Props = {
  task: Task
}

const TaskCard = ({ task }: Props) => {
  console.log(task.date)
  return (
    <Card>
      <CardContent>
        <Stack direction='row'>
          <Checkbox inputProps={{ 'aria-label': 'task' }} />
          <Typography>{task.description}</Typography>
        </Stack>
        <p>{task.date?.toDateString()}</p>
      </CardContent>

      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  )
}
export default TaskCard
