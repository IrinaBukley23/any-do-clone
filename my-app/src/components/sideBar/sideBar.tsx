import './sideBar.scss';
import React from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    Typography, 
    AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';

const SideBar = () => {

  return (
    <div className="sidebar">
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
