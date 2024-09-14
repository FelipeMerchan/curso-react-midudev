import { useReducer } from "react";

import { type FromLanguage, type Language, type TranslatorAction, type TranslatorState } from "../types.d";
import { AUTO_LANGUAGE } from "../constants";

const initialState: TranslatorState = {
  fromLanguage: "auto",
  fromText: "",
  isLoading: false,
  result: "",
  toLanguage: "en",
};

function reducer(state: TranslatorState, action: TranslatorAction) {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    /* Dentro del reducer podemos tener lógica del estado. Por lo que
    evitamos esta lógica en los componentes: */
    if (state.fromLanguage === AUTO_LANGUAGE) return state;

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      isLoading: true,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      isLoading: false,
      result: action.payload,
    };
  }

  /* Un reducer siempre tiene que devovler un nuevo estado.
  Si no es verdadera ningúna de las validaciones de los if
  devolvemos el mismo estado: */
  return state;
}

export function useStore() {
  const [{ fromLanguage, fromText, isLoading, result, toLanguage }, dispatch] =
  useReducer(reducer, initialState);

  /* No debemos devolver en este custom hook directamente el dispatch,
  en su lugar debemos crear las formas(funciones como interchangeLanguage) que tenemos de actualizar el estado.
  Si retornaramos el dispatch y todos los componentes lo usan eso generaría
  que estuvieramos atando todos los componentes a un contrato en concreto que es
  utilizar el useReducer de React, si el día de mañana cambiamos a Redux o Zustand
  no tienen por qué saberlo el resto de componentes. Es muy importante que el dispatch
  no se vea en los componentes. Una mejor práctica es que dentro del custom hook exportemos
  las funciones que cambian el estado y si el día de mañana cambiamos a Zustand el cambio
  lo hacemos solo en el custom hook en estas funciones y no en todos los compoenntes:*/
  const interchangeLanguage = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    fromText,
    isLoading,
    result,
    toLanguage,

    /* Methods */
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}