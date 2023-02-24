import styles from './sideBar.module.scss'
import CalendarView from './calendarView'
import SideBoards from './sideBoards'
import SideProjects from './sideProjects'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <CalendarView />
      <SideProjects />
      <SideBoards />
    </div>
  )
}

export default SideBar
