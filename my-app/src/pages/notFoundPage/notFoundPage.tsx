// import './tasksBlock.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <>
            <h1 className="board">NotFoundPage</h1>
            <Link to="/">back to main page</Link>
        </>
    )
}

export default NotFoundPage;