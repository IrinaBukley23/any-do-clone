import './column.scss';
import React from 'react';
import { Button, Typography } from '@mui/material';
import { IColumn } from '../../types/types';

interface IProps {
    columnItem: IColumn;
}

const Column = (props: IProps) => {

    const { columnTitle, columnId } = props.columnItem;
    
    return (
        <div id={columnId} key={columnId} className="column">
            <Typography variant="h5">{columnTitle}</Typography>
                {/* <div className="column__wrapper">
                    <div className="task">Task</div>
                </div> */}
            <Button
                color='primary'
                variant='contained'
                sx={{ height: '40px', mt: '30px' }}>
                Добавить задачу
            </Button>
        </div>
    )
}

export default Column;