import { Button, TextField } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { useId, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setColumnList, setColumnTitle } from '../../store/actions/actionCreators';
import { State } from '../../types/types';

const ColumnInput = () => {
    const [, setCreated] = useState(false);
    const { columnTitle } = useSelector((state: State) => state.column);
    const { columnList } = useSelector((state: State) => state);
    const dispatch = useDispatch();
  
    const handleChangeTitle = (
      e: React.ChangeEvent<HTMLInputElement>,
      callback: (value: string) => AnyAction
    ) => {
      dispatch(callback(e.target.value));
    };
  
    const handleSaveColumn = () => {
      dispatch(
        setColumnList([
          ...columnList,
          {
            columnId: useId(),
            columnTitle: columnTitle,
          },
        ])
      );
      console.log(columnList);
      setCreated(false);
    };
  
    return (
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
            sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}
        >
            Сохранить
        </Button>
        </>
    );
  };
  
  export default ColumnInput;