import styles from './sideBar.module.scss'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
  TextField,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import React, { useEffect, useState } from 'react'
import {
  changeProject,
  createProject,
  loadProjects,
  projectSelectors,
} from '../../store/reducers/projectReducer'
import { DialogModal } from '../ui/dialogModal'
import { calendarActions } from '../../store/reducers/calendarReducer'
import { useTranslation } from 'react-i18next'
import { Project } from '../../types/types'
import TextFieldEdit from '../ui/textFieldEdit/textFieldEdit'

const SideProjects = () => {
  const { key } = useAppSelector((state) => state.authorization)
  const projectAll = useAppSelector((state) => projectSelectors.selectAll(state.project))
  const { project } = useAppSelector((state) => state.calendar)
  const [open, setOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectEdit, setProjectEdit] = useState<Project | null>(null)

  const handleAddProject = () => {
    setOpen(true)
  }
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (key) dispatch(loadProjects(key))
    console.log('sidebar')
  }, [])
  const handleClick = (project: number | null) => {
    dispatch(calendarActions.setProject(project))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }
  const handleCancel = () => {
    setProjectEdit(null)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ key: key, name: projectName })
    if (key) dispatch(createProject({ key: key, name: projectName }))
    setOpen(false)
  }
  const handleAprove = (dataset: string, text: string) => {
    if (projectEdit && key)
      dispatch(changeProject({ key: key, project: { ...projectEdit, name: text } }))
    setProjectEdit(null)
  }
  const { t } = useTranslation()
  const handleDoubleClick = (currProject: Project) => {
    setProjectEdit(currProject)
  }
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>{t('sideBarAccordeonProj')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink
            to='/main'
            // selected={!project}
            onClick={() => handleClick(null)}
            className={!project ? styles.activeLink : ''}
          >
            <Typography>{t('sideBarProjAll')}</Typography>
          </NavLink>
          {projectAll.map((projectCurr) =>
            projectEdit?.id == projectCurr.id ? (
              <TextFieldEdit
                dataName='project'
                key={projectEdit.id}
                label='Проект'
                value={projectEdit.name}
                onAprove={handleAprove}
                onCancel={handleCancel}
              />
            ) : (
              <NavLink
                key={projectCurr.id}
                to='/main'
                onClick={() => handleClick(projectCurr.id)}
                onDoubleClick={() => handleDoubleClick(projectCurr)}
                className={project == projectCurr.id ? styles.activeLink : ''}
              >
                <Typography>{projectCurr.name}</Typography>
              </NavLink>
            ),
          )}
          <Button onClick={handleAddProject}>+</Button>
        </AccordionDetails>
      </Accordion>
      <DialogModal
        onClose={handleClose}
        isOpen={open}
        formsParams={{ textApprove: 'Добавить', formId: 'addProject' }}
      >
        <form id='addProject' onSubmit={handleSubmit} className={styles.form}>
          <TextField fullWidth label='Проект' value={projectName} onChange={handleChange} />
        </form>
      </DialogModal>
    </>
  )
}

export default SideProjects
