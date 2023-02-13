import styles from './boardPage.module.scss';
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { State } from '../../types/types';
import Column from '../../components/column/column';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { setColumnList, setColumnTitle } from '../../store/actions/actionCreators';
import nextId from 'react-id-generator';

const BoardPage = () => {
    const [isCreate, setIsCreate] = useState(false);
    const [, setCreated] = useState(false);
    const { columnTitle } = useSelector((state: State) => state.column);
    const { columnList } = useSelector((state: State) => state.column);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const [isValidate, setIsValidate] = useState(true);
    const myId = nextId();
  
    const handleChangeTitle = (
      e: React.ChangeEvent<HTMLInputElement>,
      callback: (value: string) => AnyAction
    ) => {
      (e.target.value.length < 3) ? setIsError(true) : setIsError(false);
      (e.target.value.length >= 3 && e) ? setIsValidate(false) : setIsValidate(true);
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
        <div className={styles.container}>
            <>
              {columnList?.map((column, i) => (
                <Column key={i} columnItem={column} />
             ) )}
              {isCreate && (
                <>
                <div>
                  <TextField 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTitle(e, setColumnTitle)}
                      id="filled-basic" 
                      label="Filled" 
                      variant="filled" 
                      sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '210px'}} 
                  />
                  {isError && <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red', mt: '15px', ml: '15px'}}>Необходимо минимум три символа</Typography>}
                  </div>
                <Button 
                  onClick={handleSaveColumn} 
                  color='primary' 
                  variant='contained'
                  sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}} disabled={isValidate}>
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
