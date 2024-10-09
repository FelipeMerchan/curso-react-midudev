import { create } from 'zustand'
import { type Question } from '../types'

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
}

/* create nos permite crear el estado global que ya podríamos leer
en cualquier sitio de la aplicación: */
export const useQuestionsStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit: number) => {
    /* set es usado para actualizar el estado y get para leer el estado */
    set({
      questions: [
        {
          id: 1,
          question: "¿Cuál es la salida de este código?",
          code: "console.log(typeof NaN)",
          answers: [
          "undefined",
          "NaN",
          "string",
          "number"
          ],
          correctAnswer: 3
        },
      ]
    })
  }
}))