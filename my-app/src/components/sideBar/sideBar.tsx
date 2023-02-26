import styles from './sideBar.module.scss'
import CalendarView from './calendarView'
import SideBoards from './sideBoards'
import SideProjects from './sideProjects'
import SideStatus from './sideStatus'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <CalendarView />
      <SideStatus />
      <SideProjects />
      <SideBoards />
    </div>
  )
}

export default SideBar
