import './mainPage.scss'
import TasksBlock from '../../components/tasksBlock/tasksBlock'
import DatePlan from '../../components/calendarBlock/datePlan'
import { Stack } from '@mui/system'

const MainPage = () => {
  return (
    <Stack className='main' direction='row'>
      <TasksBlock />
      <DatePlan />
    </Stack>
  )
}

export default MainPage
