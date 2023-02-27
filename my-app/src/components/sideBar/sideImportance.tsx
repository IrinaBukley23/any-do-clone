import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useState } from 'react'
import { MenuItemType } from '../../types/types'
import { TypeTagCommon, typesTag, typesTagEn } from '../../types/enum'
import { calendarActions } from '../../store/reducers/calendarReducer'
import styles from './sideBar.module.scss'

const SideImportance = () => {
  const { t } = useTranslation()
  const { tag } = useAppSelector((state) => state.calendar)
  const { lang } = useAppSelector((state) => state.lang)
  const [tagsAll, setTagAll] = useState<MenuItemType[]>(typesTag)
  const dispatch = useAppDispatch()
  const handleClick = (tagId: TypeTagCommon | null) => {
    dispatch(calendarActions.setTag(tagId))
  }
  useEffect(() => {
    if (lang == 'ru') {
      setTagAll(typesTag)
    } else {
      setTagAll(typesTagEn)
    }
  }, [lang])
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{t('sideBarTag')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NavLink
          to='/main'
          onClick={() => handleClick(null)}
          className={!tag ? styles.activeLink : ''}
        >
          <Typography>{t('sideBarAllTags')}</Typography>
        </NavLink>
        {tagsAll.map((currTag) => (
          <NavLink
            key={currTag.id}
            to='/main'
            onClick={() => handleClick(currTag.id as TypeTagCommon)}
            className={tag == currTag.id ? styles.activeLink : ''}
          >
            <Typography>{currTag.value}</Typography>
          </NavLink>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
export default SideImportance
