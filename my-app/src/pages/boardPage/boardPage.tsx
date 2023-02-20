import styles from './boardPage.module.scss';
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { ColumnItemType, ITask, State } from '../../types/types';
import Column from '../../components/column/column';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { setColumnList, setColumnTitle, sortColumnList, setTaskList } from '../../store/actions/actionCreators';
import nextId from 'react-id-generator';
import { minNumberOfLetters } from '../../types/constants';
import { useTranslation } from 'react-i18next';

let startOrder = 0;
const BoardPage = () => {
    const [isCreate, setIsCreate] = useState(false);
    const { taskList } = useSelector((state: State) => state.task);
    const [, setCreated] = useState(false);
    const { columnTitle } = useSelector((state: State) => state.column);
    const { columnList } = useSelector((state: State) => state.column);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const [isValidate, setIsValidate] = useState(true);
    const myId = nextId();
    const { t, } = useTranslation();
    const [currentColumn, setCurrentColumn] = useState<ColumnItemType>({
      columnId: '',
      columnTitle: '',
      columnOrder: 0
    });

    const [currentTask, setCurrentTask] = useState<ITask | undefined>();
    const handleChangeTitle = (
      e: React.ChangeEvent<HTMLInputElement>,
      callback: (value: string) => AnyAction
    ) => {
      (e.target.value.length < minNumberOfLetters) ? setIsError(true) : setIsError(false);
      (e.target.value.length >= minNumberOfLetters) ? setIsValidate(false) : setIsValidate(true);
      dispatch(callback(e.target.value));
    };

    const handleSaveColumn = () => {
      startOrder++;
      setIsCreate(false);
      setCreated(true);
      dispatch(
        setColumnList([
          ...columnList,
          {
            columnOrder: startOrder,
            columnId: myId,
            columnTitle: columnTitle,
          },
        ])
      );
      dispatch(setColumnTitle(''));
    };

    const handleCreateColumn = (): void => {
      setIsValidate(true)
      setIsCreate(true);
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, column: ColumnItemType): void {
      setCurrentColumn(column);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
      e.preventDefault();
      (e.target as HTMLDivElement).style.background = '#ece6e6'
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
     (e.target as HTMLDivElement).style.background = ''
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, column: ColumnItemType): void {
      e.preventDefault();
      (e.target as HTMLDivElement).style.background = '';
      if(currentTask && currentTask.currentColumnId === column.columnId) return;
      if(currentTask && currentTask.currentColumnId !== column.columnId) {
        const newTaskList = [...taskList].filter((task) => task.taskId !== currentTask.taskId)
        dispatch(
          setTaskList([...newTaskList,
            {...currentTask,
              currentColumnId: column.columnId,
            },
          ])
        );
        (e.target as HTMLDivElement).style.background = ''
        return;
      }
      dispatch(
      sortColumnList([...columnList], column, currentColumn)
      );
    }

    const sortColumns = (column1: ColumnItemType, column2: ColumnItemType) => column1.columnOrder - column2.columnOrder;

    return (
        <div className={styles.container}>
            <>
              {[...columnList]?.sort(sortColumns).map((column, i) => (
                <section 
                  key={i} 
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, column)}
                  onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                  onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, column)}
                  draggable={true}
                >
                  <Column key={i} columnItem={column} taskOnDrag={currentTask} onTaskOnDragChange={setCurrentTask} />
                </section>
             ) )}
              {isCreate && (
                <>
                <div>
                  <TextField 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTitle(e, setColumnTitle)}
                      id="filled-basic" 
                      placeholder=''
                      label={t('boardPageInputText')}
                      variant="filled" 
                      sx={{height: '40px', ml: '15px', minWidth: '210px'}} 
                  />
                  {isError && <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red', mt: '15px', ml: '15px'}}> {t('boardPageInputError')} </Typography>}
                  </div>
                <Button 
                  onClick={handleSaveColumn} 
                  color='primary' 
                  variant='contained'
                  sx={{height: '40px', ml: '15px', minWidth: '160px'}} disabled={isValidate}>
                    {t('boardPageSaveCol')}
                </Button>
                </>
                )}
              <Button 
                onClick={handleCreateColumn} 
                color='primary' 
                variant='contained'
                sx={{height: '40px', ml: '15px', minWidth: '160px'}}>
                  {t('boardPageAddCol')}
              </Button>
            </>
        </div>
    )
}

export default BoardPage;
