import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
const Task = () => {
  return (
    <Card>
      <Checkbox inputProps={{ 'aria-label': 'task' }} />
      <CardContent>
        <Typography variant='h5'>Header card</Typography>
        <Typography>description</Typography>
      </CardContent>
      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  )
}
export default Task
