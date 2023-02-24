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
import { createProject, loadProjects, projectSelectors } from '../../store/reducers/projectReducer'
import { DialogModal } from '../ui/dialogModal'
import { Project } from '../../types/types'
import { calendarActions } from '../../store/reducers/calendarReducer'

const SideProjects = () => {
  const { key } = useAppSelector((state) => state.authorization)
  const projectAll = useAppSelector((state) => projectSelectors.selectAll(state.project))
  const { project } = useAppSelector((state) => state.calendar)
  const [open, setOpen] = useState(false)
  const [projectName, setProjectName] = useState('')

  const handleAddProject = () => {
    console.log('add project')
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
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ key: key, name: projectName })
    if (key) dispatch(createProject({ key: key, name: projectName }))
    setOpen(false)
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Мои проекты</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink
            to='/main'
            // selected={!project}
            onClick={() => handleClick(null)}
            className={({ isActive }) => (!project ? styles.activeLink : '')}
          >
            <Typography>Все проекты</Typography>
          </NavLink>
          {projectAll.map((projectCurr) => (
            <NavLink
              key={projectCurr.id}
              to='/main'
              onClick={() => handleClick(projectCurr.id)}
              className={({ isActive }) => (project == projectCurr.id ? styles.activeLink : '')}
            >
              <Typography>{projectCurr.name}</Typography>
            </NavLink>
          ))}
          <Button onClick={handleAddProject}>+</Button>
        </AccordionDetails>
      </Accordion>
      <DialogModal
        onClose={handleClose}
        isOpen={open}
        formsParams={{ textApprove: 'Добавить', formId: 'addProject' }}
      >
        <form id='addProject' onSubmit={handleSubmit}>
          <TextField label='Проект' value={projectName} onChange={handleChange} />
        </form>
      </DialogModal>
    </>
  )
}

export default SideProjects
