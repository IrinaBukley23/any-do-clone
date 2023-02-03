// import './tasksBlock.scss';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <>
            <h1 className="board">NotFoundPage</h1>
            <a href='##' onClick={goBack}>back to main page</a>
        </>
    )
}

export default NotFoundPage;