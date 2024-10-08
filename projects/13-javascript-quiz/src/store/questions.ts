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
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json();

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    /* set es usado para actualizar el estado y get para leer el estado */
    set({ questions })
  }
}))