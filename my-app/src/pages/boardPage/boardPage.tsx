import styles from './boardPage.module.scss';
import React, { useCallback, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { ColumnItemType, IColumn, State } from '../../types/types';
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
    const [currentColumn, setCurrentColumn] = useState({});
    const [currentList, setCurrentList] = useState(columnList);
  
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

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, column: ColumnItemType): void {
        console.log('drag', column)
        setCurrentColumn(column);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
      console.log(e.target)
        e.preventDefault();
        (e.target as HTMLDivElement).style.background = '#ece6e6'
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
      (e.target as HTMLDivElement).style.background = '#b8b6b6'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, column: ColumnItemType): void {
        e.preventDefault();
        setCurrentList(currentList.map((c: IColumn) => {
          // if(c.columnId === column.columnId) {
          //   return {...c, columnOrder: currentColumn};
          // }
          return c;
        }));
        (e.target as HTMLDivElement).style.background = '#ece6e6'
    }


    return (
        <div className={styles.container}>
            <>
              {columnList?.map((column, i) => (
                <section 
                  key={i} 
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, column)}
                  onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                  onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, column)}
                  draggable={true}
                >
                  <Column key={i} columnItem={column} />
                </section>
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
