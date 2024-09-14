import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants"

/* Al usar typeof es copiar el contrato del objeto y el keyof es
indicar que de un objeto se quede con las llaves del objeto. */
/* Con keyof recuperamos las keys del objeto SUPPORTED_LANGUAGES */
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

/* las interfaces son más usadas para escribir el contrato de un objeto
en lugar de los types. Las interfaces son más fáciles de extender.Lo que se
suele hacer es que si es un objeto usemos directamente una interfaz: */
export interface TranslatorState {
  fromLanguage: string,
  toLanguage: string,
  fromText: string,
  result: string,
  isLoading: boolean,
}

export type TranslatorAction =
  | { type: 'SET_FROM_LANGUAGE', payload: string }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE', payload: string }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }