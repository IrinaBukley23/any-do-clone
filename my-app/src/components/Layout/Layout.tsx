import { Outlet } from 'react-router-dom';
import SideBar from '../sideBar/sideBar';
import React from 'react';

import './Layout.scss';

const Layout = () => {
    return (
        <>
        <header style={{height: '70px', background: '#ffffff'}}>Здесь могут быть цитаты </header>
        <main className='coinatiner'>
            <SideBar />
            <Outlet />
        </main>
        </>
    )
}

export default Layout;