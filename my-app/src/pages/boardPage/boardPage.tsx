import './boardPage.scss';
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { State } from '../../types/types';
import Column from '../../components/column/column';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { setColumnList, setColumnTitle } from '../../store/actions/actionCreators';
import nextId from 'react-id-generator';

const BoardPage = () => {
    const [isCreate, setIsCreate] = useState(false);
    const [, setCreated] = useState(false);
    const myId = nextId();
    const { columnTitle } = useSelector((state: State) => state.column);
    const { columnList } = useSelector((state: State) => state.column);
    const dispatch = useDispatch();
  
    const handleChangeTitle = (
      e: React.ChangeEvent<HTMLInputElement>,
      callback: (value: string) => AnyAction
    ) => {
      dispatch(callback(e.target.value));
    };
  
    const handleSaveColumn = () => {
      setIsCreate(false);
      setCreated(true);
      dispatch(
        setColumnList([
          ...columnList,
          {
            columnId: myId,
            columnTitle: columnTitle,
          },
        ])
      );
    };

    const handleCreateColumn = (): void => {
        setIsCreate(true);
    }

    return (
        <div className="container">
            <>
              {columnList?.map((column, i) => (
                <Column key={i} columnItem={column} />
             ) )}
              {isCreate && (
                <>
                <TextField 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTitle(e, setColumnTitle)}
                    id="filled-basic" 
                    label="Filled" 
                    variant="filled" 
                    sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '210px'}} 
                />
                <Button 
                  onClick={handleSaveColumn} 
                  color='primary' 
                  variant='contained'
                  sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}>
                    Сохранить
                </Button>
                </>
                )}
              <Button 
                onClick={handleCreateColumn} 
                color='primary' 
                variant='contained'
                sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}>
                  Добавить колонку
              </Button>
            </>
        </div>
    )
}

export default BoardPage;
