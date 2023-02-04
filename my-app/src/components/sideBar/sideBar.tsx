import './sideBar.scss';
import React, {useState} from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    Typography, 
    AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

const SideBar = () => {

  const [dateState, setDateState] = useState(new Date())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeDate = (e: any) => {
    setDateState(e)
  }
  console.log(moment(dateState))

  return (
    <div className="sidebar">
      <Calendar 
        value={dateState}
        onChange={changeDate}
      />
      
      <p>Сегодня: <b> {moment(dateState).format('Do MMMM YYYY')}</b></p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Мои проекты</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to="/main" className={({isActive}) => isActive ? 'active-link' : ''}>
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
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Мои доски</Typography>
          </AccordionSummary>
        <AccordionDetails>
          <NavLink to="/board" className={({isActive}) => isActive ? 'active-link' : ''}>          
            <Typography>Мои доски</Typography>
          </NavLink>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SideBar;
