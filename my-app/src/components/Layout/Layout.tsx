import { Outlet } from 'react-router-dom'
import SideBar from '../sideBar/sideBar'

import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <>
      <header style={{ height: '70px', background: '#ffffff' }}>Здесь могут быть цитаты </header>
      <main className={styles.container}>
        <SideBar />
        <Outlet />
      </main>
    </>
  )
}

export default Layout
