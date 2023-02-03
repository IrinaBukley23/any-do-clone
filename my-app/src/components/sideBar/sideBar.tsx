import './sideBar.scss';
import React from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    Typography, 
    AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

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
          <Link to="/">
            <Typography>Все проекты</Typography>
          </Link>

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
          <Link to="/board">          
            <Typography>Мои доски</Typography>
          </Link>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SideBar;
