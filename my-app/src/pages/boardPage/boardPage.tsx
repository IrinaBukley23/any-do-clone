import styles from './boardPage.module.scss';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { ITask, State, TaskItemType } from '../../types/types';
import Column from '../../components/column/column';
import { useSelector } from 'react-redux';
import { setColumnTitle, setTaskList, sortColumnList } from '../../store/actions/actionCreators';
import { minNumberOfLetters } from '../../types/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { columnSelectors, createColumn, loadColumns } from '../../store/reducers/columns';
import FormControl from '@mui/material/FormControl';
import { IColumn } from '../../api/ColumnApi';

const BOARD_REFRESH_INTERVAL = 5000;

const BoardPage = () => {
    const dispatch = useAppDispatch();

    const columns = useAppSelector((state) => columnSelectors.selectAll(state.columns));

    const [isCreate, setIsCreate] = useState(false);
    const { taskList } = useSelector((state: State) => state.task);

    const { columnTitle } = useAppSelector((state) => state.column);
    const { columnList } = useAppSelector((state) => state.column);
    const [isError, setIsError] = useState(false);

    const { t, } = useTranslation();
  
    const [currentColumn, setCurrentColumn] = useState<IColumn | null>(null);
    const [currentTask, setCurrentTask] = useState<TaskItemType | undefined>();
    const [isFirstEffect, setIsFirstEffect] = useState(true);
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
      dispatch(setColumnTitle(e.target.value));
    };

    const onCreationFormSubmit = (event: React.FormEvent): void => {
      setIsCreate(false);
      setIsError(true);
      event.preventDefault();
      dispatch(createColumn({ title: columnTitle }))
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
      setCurrentColumn(column);
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
      if((e.target as HTMLElement).classList.contains('task__title') || (e.target as HTMLElement).classList.contains('column__wrapper')) {
        if(currentTask && currentTask.currentColumnId === column.id) return;
        if(currentTask && currentTask.currentColumnId !== column.id) {
          const newTaskList = [...taskList].filter((task) => task.taskId !== currentTask.taskId)
          dispatch(
            setTaskList([...newTaskList,
              {...currentTask,
                currentColumnId: column.id,
              },
            ])
          );
          console.log(e.target);
          (e.target as HTMLDivElement).style.background = ''
          return;
        }
      } 
      if((e.target as HTMLElement).classList.contains('column__title') && currentColumn !== null) {
        dispatch(
          sortColumnList([...columnList], column, currentColumn)
          );
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
                <Column key={column.id} columnItem={column} taskOnDrag={currentTask} onTaskOnDragChange={setCurrentTask} />
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
