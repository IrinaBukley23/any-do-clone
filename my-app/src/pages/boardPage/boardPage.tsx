import styles from './boardPage.module.scss';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Column, { COLUMN_CLASS_NAME } from '../../components/column/column';
import { minNumberOfLetters } from '../../types/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { columnSelectors, createColumn, insertColumnBefore, loadColumns } from '../../store/reducers/columns';
import FormControl from '@mui/material/FormControl';
import { insertCardToColumn } from '../../store/reducers/cards';
import { ICard, IColumn } from '../../types/types';

const BOARD_REFRESH_INTERVAL = 5000;

const BoardPage = () => {
    const dispatch = useAppDispatch();

    const columns = useAppSelector((state) => columnSelectors.selectAll(state.columns));

    const [isCreate, setIsCreate] = useState(false);

    const [isError, setIsError] = useState(false);

    const { t, } = useTranslation();
  
    const [currentColumn, setCurrentColumn] = useState<IColumn | null>(null);
    const [currentTask, setCurrentTask] = useState<ICard | undefined>();
    const [isFirstEffect, setIsFirstEffect] = useState(true);
    const [title, setTitle] = useState('');

    useEffect(() => {
      if (isFirstEffect) {
        setIsFirstEffect(false);
        dispatch(loadColumns());
      }

      const intervalId = setInterval(() => {
        dispatch(loadColumns());
      }, BOARD_REFRESH_INTERVAL)

      return () => {
        clearInterval(intervalId);
      }
    });
  
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      const length = e.target.value.length;
      setIsError(length < minNumberOfLetters);
      setTitle(e.target.value);
    };

    const onCreationFormSubmit = (event: React.FormEvent): void => {
      setIsCreate(false);
      setIsError(true);
      event.preventDefault();
      dispatch(createColumn({ title, order: 0 }))
    };

    const onCreationFormReset = (): void => {
      setIsCreate(false);
      setIsError(true);
    }

    const handleCreateColumn = (): void => {
      setIsError(false);
      setIsCreate(true);
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, column: IColumn): void {
      const target = e.target as HTMLElement;
      if (target.querySelector(`.${COLUMN_CLASS_NAME}`)) {
        setCurrentColumn(column);
      }
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
      e.preventDefault();
      (e.target as HTMLDivElement).style.background = '#ece6e6'
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
      (e.target as HTMLDivElement).style.background = ''
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, column: IColumn): void {
      e.preventDefault();
      (e.target as HTMLDivElement).style.background = '';
      if (currentTask !== undefined) {
        dispatch(insertCardToColumn(currentTask, column.id));
        setCurrentTask(undefined);
      }

      if(currentColumn !== null) {
        dispatch(insertColumnBefore(currentColumn, column));
        setCurrentColumn(null)
      }
     
      (e.target as HTMLDivElement).style.background = '';
     
    }

    return (
        <div className={styles.container}>
            {columns.map((column) => (
              <section
                key={column.id}
                onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, column)}
                onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, column)}
                draggable={true}
              >
                <Column
                  key={column.id}
                  columnItem={column}
                  draggedCard={currentTask}
                  onDragCard={setCurrentTask}
                />
              </section>
            ) )}
            {isCreate ? (
              <form onSubmit={onCreationFormSubmit} onReset={onCreationFormReset}>
                <FormControl>
                  <TextField
                      onChange={handleChangeTitle}
                      id="filled-basic" 
                      placeholder=''
                      label={t('boardPageInputText')}
                      variant="filled" 
                      sx={{mt: '30px', ml: '15px'}}
                  />
                  {isError && (
                    <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red', mt: '15px', ml: '15px'}}> {t('boardPageInputError')} </Typography>
                  )}
                </FormControl>
                <Button
                  type='submit'
                  color='primary' 
                  variant='contained'
                  sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}
                  disabled={isError}
                >
                    {t('boardPageSaveCol')}
                </Button>
                <Button
                  type='reset'
                  color='primary'
                  variant='contained'
                  sx={{height: '40px', mt: '30px', ml: '15px', minWidth: '160px'}}
                >
                    Отмена
                </Button>
              </form>
            ) : (
              <Button
                onClick={handleCreateColumn}
                color='primary' 
                variant='contained'
                sx={{height: '40px', ml: '15px', minWidth: '160px'}}>
                  {t('boardPageAddCol')}
              </Button>
            )}
        </div>
    )
}

export default BoardPage;
