import styles from './sideBar.module.scss'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SideBoards = () => {
  const { t } = useTranslation()
  return (
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
  )
}
export default SideBoards
