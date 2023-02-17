import styles from './column.module.scss';
import React, { useState } from 'react';
import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { ColumnItemType, State, TaskItemType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editColumnTitle, setCurrentId, setRemoveColumn, sortTaskList } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Task from '../task/task';
import { DialogConfirm } from '../UI/dialogConfirm';
import ResponsiveDialog from '../UI/openDialog';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'

interface IProps {
    columnItem: ColumnItemType;
  }

const Column = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const [isTaskModal, setIsTaskModal] = useState(false);
    const { columnTitle, columnId } = props.columnItem;
    const dispatch = useDispatch();
    const { taskList } = useSelector((state: State) => state.task);
    const taskQuantity = taskList.length;
  
    const [isEdit, setIsEdit] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(columnTitle);
    const [currentColumn, setCurrentColumn] = useState<ColumnItemType>({
        columnId: '',
        columnTitle: '',
        columnOrder: 0
      });
    const [currentTask, setCurrentTask] = useState<TaskItemType>({
        taskId: '',
        taskTitle: '',
        taskDescr: '',
        taskOrder: 0,
        currentColumnId: ''
      });


    const handleEdit = () => {
      setIsEdit(true);
    };
  
    const handleCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectedTitle(e.target.value);
    };
  
    const handleSave = () => {
      setIsEdit(false);
      dispatch(editColumnTitle(columnId, correctedTitle));
    };
  
    const handleCancel = () => {
      setIsEdit(false);
    };

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleTaskFormOpen = (e: React.SyntheticEvent) => {
        const targetId = ((e.target as HTMLElement).closest('div') as HTMLElement).id;
        dispatch(setCurrentId(targetId));
        setIsTaskModal(true);
    };
    const handleTaskFormClose = () => {
        setIsTaskModal(false);
    };

    const handleRemove = () => {
        dispatch(setRemoveColumn(columnId));
        setOpen(false);
    };

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, task: TaskItemType, column?: ColumnItemType): void {
       setCurrentTask(task);
      // setCurrentColumn(column);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault();
       (e.target as HTMLDivElement).style.boxShadow = '0 2 px 3px gray'
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
     (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, task: TaskItemType, column?: ColumnItemType): void {
        e.preventDefault();
       dispatch(
        sortTaskList([...taskList], task, currentTask)
       );
      (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    const sortTasks = (task1: TaskItemType, task2: TaskItemType) => task1.taskOrder - task2.taskOrder;

    return (
        <div
            id={columnId} 
            className={styles.column}>
            {!isEdit && <Typography variant="h5" onClick={handleEdit}>{columnTitle}</Typography>
            }
            {isEdit && (
                <div className={styles.column__edit}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedTitle} onChange={handleCorrect} sx={{width: '160px'}} />
                    {/* <ThumbUpAltIcon onClick={handleSave} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon> */}
                    <IconButton color='success' onClick={handleSave}>
                        <DownloadDoneIcon />
                    </IconButton>
                    <CancelIcon onClick={handleCancel} sx={{color: '#d3586c', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <Typography variant="h5" component="p" sx={{fontSize: '14px', textAlign: 'left'}}>Карточек - {taskQuantity}</Typography>
            <div>
                <Tooltip title="Delete column">
                    <IconButton 
                        onClick={handleOpen}
                        sx={{position: 'absolute', top: '5px', right: '5px' , color: '#ab45fa'}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <DialogConfirm isOpen={open} handleClose={handleClose} handleRemove={handleRemove} />
            </div>
            <div className={styles.column__wrapper}
                >
                {[...taskList]?.sort(sortTasks).filter(task => task.currentColumnId === columnId).map((task, i) => (
                    <div
                        key={i} 
                        onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, task)}
                        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                        onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                        onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                        onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, task)}
                        draggable={true}
                    >
                        <Task key={i} taskItem={task}/>
                    </div>
                ) )}
            </div>
            <Button onClick={handleTaskFormOpen} color='primary' variant='contained' sx={{ height: '40px', mt: '30px'}}>
                Добавить задачу
            </Button>
            <ResponsiveDialog isOpen={isTaskModal} handleClose={handleTaskFormClose} />
        </div>
    )
}

export default Column;
