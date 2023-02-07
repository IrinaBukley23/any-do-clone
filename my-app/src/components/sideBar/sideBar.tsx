import './sideBar.scss'
import 'moment/locale/ru'
import { useEffect, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { CreatorsCalendar } from '../../store/actions/calendar/creatorsCalendar'
import { State } from '../../types/types'

const SideBar = () => {
  // const [dateState, setDateState] = useState(new Date())
  const { dateCurrent } = useSelector((state: State) => state.calendar)
  useEffect(() => {
    console.log(111, dateCurrent)
  }, [])
  const dispatch = useDispatch()
  const changeDate = (date: Date | null) => {
    console.log(date)
    if (date) {
      dispatch(CreatorsCalendar.setCurrentDate(date))
    }
  }

  return (
    <div className='sidebar'>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
        <StaticDatePicker
          displayStaticWrapperAs='desktop'
          value={dateCurrent}
          onChange={changeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <p>
        Дата: <b> {moment(dateCurrent).format('Do MMMM YYYY')}</b>
      </p>
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
          <NavLink to='/board' className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <Typography>Мои доски</Typography>
          </NavLink>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SideBar
