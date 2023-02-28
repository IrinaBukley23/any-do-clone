import styles from './mainPage.module.scss'
import TasksBlock from '../../components/tasksBlock/tasksBlock'
import DatePlan from '../../components/calendarBlock/datePlan'
import { Stack } from '@mui/system'

const MainPage = () => {
  return (
    <Stack className={styles.main} direction='row'>
      <TasksBlock />
      <DatePlan />
    </Stack>
  )
}

export default MainPage
