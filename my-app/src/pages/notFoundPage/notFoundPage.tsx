import { Button } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './notFoundPage.module.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t, } = useTranslation();

    const goBack = () => navigate(-1);
    return (
        <div className={styles.container}>
            <h1>{t('404PageTitle')}</h1>
            <Button href='##' onClick={goBack}>{t('404PageBack')}</Button>
        </div>
    )
}

export default NotFoundPage;