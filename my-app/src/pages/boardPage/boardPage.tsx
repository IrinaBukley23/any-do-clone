import './boardPage.scss';
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { IColumn } from '../../utils/types';

const BoardPage = () => {
    const [isCreateColumn, setIsCreateColumn] = useState(false);
    const [created, setCreated] = useState(false);
    const [title, setTitle] = useState('');
    const [columns, setColumns] = useState<IColumn[]>([]);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleClickCreateColumn = () => {
        setIsCreateColumn(true);
    }

    const handleSaveColumn = () => {
        setIsCreateColumn(false);
        setCreated(true);
        setColumns([
            ...columns,
            {
            title: title
        }])
    }

    return (
        <div className="container">
            {/* <div className="column__wrapper">
                    <div className="task">Task</div>
                    <div className="task">Task</div>
                    <div className="task">Task</div>
                    <div className="task">Task</div>
                </div>
             */}
            {created && (
                columns.map(column => {
                    return (
                        <div key={column.title} className="column">
                            <Typography variant="h5">{column.title}</Typography>

                            <Button
                                color='primary'
                                variant='contained'
                                sx={{ height: '40px', mt: '30px' }}>
                                Добавить задачу
                            </Button>
                        </div>
                    )
                })
            )}
            {isCreateColumn && (
                <>
                <TextField 
                    onChange={handleChangeTitle}
                    id="filled-basic" 
                    label="Filled" 
                    variant="filled" 
                    sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '210px'}} 
                />
                <Button 
                    onClick={handleSaveColumn} 
                    color='primary' 
                    variant='contained'
                    sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}
                >
                    Сохранить
                </Button>
                </>
                )}

            
            <Button 
                onClick={handleClickCreateColumn} 
                color='primary' 
                variant='contained'
                sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}>
                Добавить колонку
            </Button>
        </div>
    )
}

export default BoardPage;
