import { Card, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { ITask } from '../../types/types'
import { Stack } from '@mui/system'

type Props = {
  task: ITask
}

const TaskCard = ({ task }: Props) => {
  // console.log(task.taskDate)
  return (
    <Card>
      <CardContent>
        <Stack direction='row'>
          <Checkbox inputProps={{ 'aria-label': 'task' }} />
          {/* <Typography>{task.taskDescription}</Typography> */}
        </Stack>
        {/* <p>{task.taskDate?.toDateString()}</p> */}
      </CardContent>

      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  )
}
export default TaskCard
