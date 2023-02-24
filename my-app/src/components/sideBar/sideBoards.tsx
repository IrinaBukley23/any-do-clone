import styles from './sideBar.module.scss'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'

const SideBoards = () => {
  return (
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
  )
}
export default SideBoards
