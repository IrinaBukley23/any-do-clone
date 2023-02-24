import { Projects, ProjectsEn } from '../../types/enum'
export const setColor = (project: Projects) => {
  switch (project) {
    case Projects.health:
      return 'success'
    case Projects.buiseness:
      return 'error'
    case Projects.family:
      return 'warning'
    case Projects.journey:
      return 'secondary'
    case Projects.hobby:
      return 'primary'
  }
}
export const setColorEn = (project: ProjectsEn) => {
  switch (project) {
    case ProjectsEn.health:
      return 'success'
    case ProjectsEn.buiseness:
      return 'error'
    case ProjectsEn.family:
      return 'warning'
    case ProjectsEn.journey:
      return 'secondary'
    case ProjectsEn.hobby:
      return 'primary'
  }
}