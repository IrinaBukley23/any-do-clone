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
import { useEffect, useState } from 'react'
import { createProject, loadProjects, projectSelectors } from '../../store/reducers/projectReducer'
import { DialogModal } from '../ui/dialogModal'

const SideProjects = () => {
  const { key } = useAppSelector((state) => state.authorization)
  const projectAll = useAppSelector((state) => projectSelectors.selectAll(state.project))

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
          <NavLink to='/main' className={({ isActive }) => (isActive ? styles.activeLink : '')}>
            <Typography>Все проекты</Typography>
          </NavLink>
          {projectAll.map((project) => (
            <Typography key={project.id}>{project.name}</Typography>
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
