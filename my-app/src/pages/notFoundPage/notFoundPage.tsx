// import './tasksBlock.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <>
            <h1>NotFoundPage</h1>
            <a href='##' onClick={goBack}>back...</a>
        </>
    )
}

export default NotFoundPage;