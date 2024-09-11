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