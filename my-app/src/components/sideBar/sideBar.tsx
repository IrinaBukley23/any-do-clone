import styles from './sideBar.module.scss'
import 'moment/locale/ru'
import { useTranslation } from 'react-i18next'

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
import { PickersDay } from '@mui/x-date-pickers'
import { useEffect } from 'react'
import { calendarActions, calendarSelectors, loadTasks } from '../../store/reducers/calendarReducer'

import { getCurrTasks } from '../../store/utils'

const CustomBar = () => {
  const { dateCurrent } = useAppSelector(
    (state) => state.calendar,
    (prev, curr) => prev.dateCurrent == curr.dateCurrent,
  )
  const taskList = useAppSelector(
    (state) => getCurrTasks(calendarSelectors.selectAll(state.calendar), new Date(dateCurrent)),
    (prev, curr) => prev.length == curr.length,
  )

  const { t } = useTranslation()
  const { lang } = useAppSelector((state) => state.lang)

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
  const { dateCurrent } = useAppSelector(
    (state) => state.calendar,
    (prev, curr) => prev.dateCurrent == curr.dateCurrent,
  )
  const taskListAll = useAppSelector((state) => calendarSelectors.selectAll(state.calendar))
  const { key } = useAppSelector((state) => state.authorization)
  const { lang } = useAppSelector((state) => state.lang)

  const dispatch = useAppDispatch()

  console.log('sidebaRender', dateCurrent)

  const changeDate = (date: string | null) => {
    if (date) {
      dispatch(
        calendarActions.setCurrentDate(moment(date).hour(0).minute(0).format('YYYY-MM-DD HH:mm')),
      )
      dispatch(
        calendarActions.setDateSelectedInPlan(
          moment(date).hour(0).minute(0).format('YYYY-MM-DD HH:mm'),
        ),
      )
    }
  }
  useEffect(() => {
    if (key) dispatch(loadTasks(key))
    console.log('sidebar')
  }, [])
  const { t } = useTranslation()
  return (
    <div className={styles.sidebar}>
      <Paper>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={lang}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            value={dateCurrent}
            onChange={changeDate}
            // sx={{ minHeight: 'inherits' }}
            renderInput={(params) => <TextField {...params} />}
            components={{
              ActionBar: CustomBar,
            }}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected = taskListAll
                .map((task) => task.performDate)
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
