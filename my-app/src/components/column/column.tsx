import styles from './column.module.scss';
import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Task from '../task/task';
import { DialogConfirm } from '../ui/dialogConfirm';
import ResponsiveDialog from '../ui/openDialog';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteColumn, updateColumnTitle } from '../../store/reducers/columns';
import { cardSelectors, insertCardBefore, loadCards } from '../../store/reducers/cards';
import { ICard, IColumn } from '../../types/types';

interface IProps {
  columnItem: IColumn;
  draggedCard: ICard | undefined;
  onDragCard: (card: ICard | undefined) => void
}

const REFRESH_INTERVAL = 5000;

const Column = (props: IProps) => {
    const dispatch = useAppDispatch();

    const column = props.columnItem;
    const { title: columnTitle, id: columnId } = column;

    const cards = useAppSelector(
        (state) => cardSelectors
            .selectAll(state.cards)
            .filter((card) => card.columnId === column.id)
    );

    const taskQuantity = cards.length;

    const [open, setOpen] = useState(false);
    const [isTaskModal, setIsTaskModal] = useState(false);
    const { t, } = useTranslation();
    const [isEdit, setIsEdit] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(columnTitle);

    const [isFirstEffect, setIsFirstEffect] = useState(true);
    
    useEffect(() => {
      if (isFirstEffect) {
        setIsFirstEffect(false);
        dispatch(loadCards());
      }

      const intervalId = setInterval(() => {
        dispatch(loadCards());
      }, REFRESH_INTERVAL)

      return () => {
        clearInterval(intervalId);
      }
    });

    const handleEdit = () => {
      setIsEdit(true);
    };
  
    const handleCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectedTitle(e.target.value);
    };
  
    const handleSave = () => {
        dispatch(updateColumnTitle(columnId, correctedTitle));
        setIsEdit(false);
        setCorrectedTitle('');
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

    const handleTaskFormOpen = () => {
        setIsTaskModal(true);
    };

    const handleTaskFormClose = () => {
        setIsTaskModal(false);
    };

    const handleRemove = () => {
        dispatch(deleteColumn(columnId))
        setOpen(false);
    };

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICard): void {
        props.onDragCard(card);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        (e.target as HTMLDivElement).style.boxShadow = '0 2 px 3px gray'
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
        (e.target as HTMLDivElement).style.boxShadow = '0 2 px 3px gray'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, card: ICard): void {
        if(!props.draggedCard) return;
        e.preventDefault();
        dispatch(insertCardBefore(props.draggedCard, card))
        props.onDragCard(undefined);
    }

    return (
        <div id={String(columnId)} className={styles.column}>
            {isEdit ? (
                <div className={styles.column__edit}>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={correctedTitle}
                        onChange={handleCorrect}
                        sx={{width: '160px'}}
                    />
                    <IconButton color='success' onClick={handleSave}>
                        <DownloadDoneIcon />
                    </IconButton>
                    <CancelIcon
                        onClick={handleCancel}
                        sx={{color: 'blue', ml: '10px'}}
                    />
                </div>
            ) : (
                <Typography variant="h5" className={styles.column__title} onDoubleClick={handleEdit}>{columnTitle}</Typography>
            )}
            <Typography variant="h5" component="p" sx={{fontSize: '14px', textAlign: 'left'}}>{t('columnCards')} - {taskQuantity}</Typography>
            <div>
                <Tooltip title={t('columnDel')}>
                    <IconButton 
                        onClick={handleOpen}
                        sx={{position: 'absolute', top: '5px', right: '5px' , color: '#ab45fa'}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <DialogConfirm
                    isOpen={open}
                    handleClose={handleClose}
                    handleRemove={handleRemove}
                />
            </div>
            <div className={styles.column__wrapper}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, card)}
                        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                        onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                        onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                        onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, card)}
                        draggable={true}
                    >
                        <Task card={card}/>
                    </div>
                  ) )}
                </div>
            <Button onClick={handleTaskFormOpen} color='primary' variant='contained' sx={{ height: '40px', mt: '30px', cursor: 'pointer'}}>
                {t('columnAddTask')}
            </Button>
            <ResponsiveDialog
                column={column}
                isOpen={isTaskModal}
                handleClose={handleTaskFormClose}
            />
        </div>
    )
}

export default Column
