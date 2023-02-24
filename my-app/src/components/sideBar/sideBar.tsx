import styles from './sideBar.module.scss'
import 'moment/locale/ru'
import { useTranslation } from 'react-i18next';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper,
  Badge,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrDate } from '../../store/actions/actionCalendar'
import { PickersDay } from '@mui/x-date-pickers'
import { useSelector } from 'react-redux';
import { State } from '../../types/types';
const CustomBar = () => {
  const { t, } = useTranslation();
  const { taskList } = useAppSelector((state) => state.calendar)
  const { lang } = useSelector((state: State) => state.lang)

  return (
    <>
      <p>
        {t('sideBarDate')} <b> {moment(new Date()).locale(lang).format('Do MMMM YYYY')}</b>
      </p>
      <p>
        {t('sideBarTasksAmount')} <b>{taskList.length}</b>
      </p>
    </>
  )
}
const SideBar = () => {
  const { dateCurrent } = useAppSelector((state) => state.calendar)
  const { lang } = useSelector((state: State) => state.lang)
  const { taskListAll } = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch()
  const changeDate = (date: string | null) => {
    if (date) {
      dispatch(setCurrDate(moment(date).format('YYYY-MM-DD HH:mm')))
    }
  }
  const { t, } = useTranslation();
  return (
    <div className={styles.sidebar}>
      <Paper>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={lang}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            value={dateCurrent}
            onChange={changeDate}
            renderInput={(params) => <TextField {...params} />}
            components={{
              ActionBar: CustomBar,
            }}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected = taskListAll
                .map((task) => task.dateCreate)
                .some((x) => moment(day).isSame(x, 'day'))

              return (
                <Badge
                  key={day.toString()}
                  overlap='circular'
                  color='primary'
                  badgeContent={isSelected ? '' : undefined}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  sx={{
                    '& .MuiBadge-badge': {
                      right: '50%',
                      height: '2px',
                      width: '1px',
                    },
                  }}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              )
            }}
          />
        </LocalizationProvider>
      </Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>{t('sideBarAccordeonProj')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/main' className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <Typography>{t('sideBarProjAll')}</Typography>
          </NavLink>

          <Typography>{t('sideBarProjHealth')}</Typography>
          <Typography>{t('sideBarProjBusines')}</Typography>
          <Typography>{t('sideBarProjFamily')}</Typography>
          <Typography>{t('sideBarProjTravel')}</Typography>
          <Typography>{t('sideBarProjHobby')}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>{t('sideBarAccordeonBoards')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/board' className={({ isActive }) => (isActive ? styles.activeLink : '')}>
            <Typography>{t('sideBarBoard')}</Typography>
          </NavLink>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SideBar
