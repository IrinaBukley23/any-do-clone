export enum typeForm {
  login = 'login',
  registr = 'registration',
}

export interface IColumn {
  title: string
}

export type FormParam = {
  textAprove: string
  formId: string
}

export type Task = {
  id: number
  title: string
  description: string
  people: Array<number>
  date?: Date
  dateTo?: Date
}
