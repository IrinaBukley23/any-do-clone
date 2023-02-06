import './sideBar.scss'
import 'moment/locale/ru'
import { useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'

const SideBar = () => {
  const [dateState, setDateState] = useState(new Date())

  const changeDate = (e: Date | null) => {
    if (e) setDateState(e)
  }

  return (
    <div className='sidebar'>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
        <StaticDatePicker
          displayStaticWrapperAs='desktop'
          value={dateState}
          onChange={changeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <p>
        Дата: <b> {moment(dateState).format('Do MMMM YYYY')}</b>
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
