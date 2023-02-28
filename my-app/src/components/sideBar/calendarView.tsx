import 'moment/locale/ru'
import styles from './sideBar.module.scss'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AccordionSummary, Badge, Accordion, AccordionDetails } from '@mui/material'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { PickersDay } from '@mui/x-date-pickers'
import { useEffect } from 'react'
import {
  calendarActions,
  calendarSelectors,
  getTaskListAll,
  loadTasks,
} from '../../store/reducers/calendarReducer'
import { getCurrTasks } from '../../store/utils'
import { useTranslation } from 'react-i18next'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

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
    <div className={styles.calendarWrapper}>
      <p>
        {t('sideBarDate')}
        <br /> <b> {moment(new Date()).locale(lang).format('Do MMMM YYYY')}</b>
      </p>
      <p>
        {t('sideBarTasksAmount')} <b>{taskList.length}</b>
      </p>
    </div>
  )
}
const CalendarView = () => {
  const { dateCurrent } = useAppSelector(
    (state) => state.calendar,
    (prev, curr) => prev.dateCurrent == curr.dateCurrent,
  )
  const taskListAll = useAppSelector((state) => getTaskListAll(state.calendar))
  const { key } = useAppSelector((state) => state.authorization)
  const { lang } = useAppSelector((state) => state.lang)

  const dispatch = useAppDispatch()

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
  }, [])

  return (
    <Accordion>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <CustomBar />
      </AccordionSummary>
      <AccordionDetails sx={{ margin: 0, padding: 0 }}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={lang}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            value={dateCurrent}
            onChange={changeDate}
            className={styles.calendar}
            renderInput={(params) => <TextField {...params} />}
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
      </AccordionDetails>
    </Accordion>
  )
}
export default CalendarView
