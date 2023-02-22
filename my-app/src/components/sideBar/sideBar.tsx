import styles from './sideBar.module.scss'
import 'moment/locale/ru'

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
import { useSelector } from 'react-redux'
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
  return (
    <>
      <p>
        Выбранная дата: <b> {moment(new Date(dateCurrent)).format('Do MMMM YYYY')}</b>
      </p>
      <p>
        Количество задач: <strong>{taskList.length}</strong>
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
  return (
    <div className={styles.sidebar}>
      <Paper>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
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
          <Typography>Мои проекты</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/main' className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <Typography>Все проекты</Typography>
          </NavLink>

          <Typography>Здоровье</Typography>
          <Typography>Бизнес</Typography>
          <Typography>Семья</Typography>
          <Typography>Путешествия</Typography>
          <Typography>Хобби</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Мои доски</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to='/board' className={({ isActive }) => (isActive ? styles.activeLink : '')}>
            <Typography>Мои доски</Typography>
          </NavLink>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SideBar
