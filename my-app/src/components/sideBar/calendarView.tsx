import 'moment/locale/ru'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Paper, Badge } from '@mui/material'

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
import { useTranslation } from 'react-i18next'

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
const CalendarView = () => {
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

  return (
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
  )
}
export default CalendarView
