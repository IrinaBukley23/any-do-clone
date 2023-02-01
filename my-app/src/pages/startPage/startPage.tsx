import { Typography } from '@mui/material';
import React from 'react';

import './startPage.scss';

const StartPage = () => {
    return (
        <div className='container'>
            <Typography variant="h1" component="h4">
                Добро пожаловать в ЛидерТаск!
            </Typography>
        </div>
    )
}

export default StartPage;