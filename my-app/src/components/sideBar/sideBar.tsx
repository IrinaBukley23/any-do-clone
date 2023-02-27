import styles from './sideBar.module.scss'
import CalendarView from './calendarView'
import SideBoards from './sideBoards'
import SideProjects from './sideProjects'
import SideStatus from './sideStatus'
import SideImportance from './sideImportance'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <CalendarView />
      <SideStatus />
      <SideImportance />
      <SideProjects />
      <SideBoards />
    </div>
  )
}

export default SideBar
