import { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { type TranslatorAction, type TranslatorState } from "./types.d";

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

function App() {
  const [{ fromLanguage, fromText, isLoading, result, toLanguage }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <>
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          dispatch({ type: "SET_FROM_LANGUAGE", payload: "es" });
        }}
      >
        Cambiar a español
      </button>
    </>
  );
}

export default App;
