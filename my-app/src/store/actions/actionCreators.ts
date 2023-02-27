import { Actions } from '../../types/enum'

export const setLang = (lang: string) => ({
  type: Actions.SET_LANG,
  payload: lang,
})