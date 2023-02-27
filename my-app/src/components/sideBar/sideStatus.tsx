import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { MenuItemType } from '../../types/types'
import { typesStartTask, typesStartTaskEn, TypeStatusCommon } from '../../types/enum'
import { calendarActions } from '../../store/reducers/calendarReducer'
import { useTranslation } from 'react-i18next'
import styles from './sideBar.module.scss'

const SideStatus = () => {
  const { t } = useTranslation()
  const { key } = useAppSelector((state) => state.authorization)
  const { status } = useAppSelector((state) => state.calendar)
  const { lang } = useAppSelector((state) => state.lang)
  const [statusAll, setStatusAll] = useState<MenuItemType[]>(typesStartTask)
  const dispatch = useAppDispatch()
  const handleClick = (statusId: TypeStatusCommon | null) => {
    dispatch(calendarActions.setStatus(statusId))
  }
  useEffect(() => {
    if (lang == 'ru') {
      setStatusAll(typesStartTask)
    } else {
      setStatusAll(typesStartTaskEn)
    }
  }, [lang])
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{t('sideBarStatus')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NavLink
          to='/main'
          onClick={() => handleClick(null)}
          className={!status ? styles.activeLink : ''}
        >
          <Typography>{t('sideBarCurrTasks')}</Typography>
        </NavLink>
        {statusAll.map((currStatus) => (
          <NavLink
            key={currStatus.id}
            to='/main'
            onClick={() => handleClick(currStatus.id as TypeStatusCommon)}
            className={status == currStatus.id ? styles.activeLink : ''}
          >
            <Typography>{currStatus.value}</Typography>
          </NavLink>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
export default SideStatus
