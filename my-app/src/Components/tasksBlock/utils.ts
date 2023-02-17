import { Projects } from './../../types/enum'
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
