import './mainPage.scss';
import React from 'react';
import SideBar from '../../components/sideBar/sideBar';
import TasksBlock from '../../components/tasksBlock/tasksBlock';

const MainPage = () => {
    return (
        <div className="main">
            <SideBar />
            <TasksBlock />
        </div>
    )
}

export default MainPage;
