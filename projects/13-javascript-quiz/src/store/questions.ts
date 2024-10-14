import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware';
import { getAllQuestions } from '../services/questions';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

/* create nos permite crear el estado global que ya podríamos leer
en cualquier sitio de la aplicación: */
export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const response = await getAllQuestions()

      const questions = response.sort(() => Math.random() - 0.5).slice(0, limit)
      /* set es usado para actualizar el estado y get para leer el estado */
      set({ questions }, false, 'FETCH_QUESTIONS')
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions)
      /* Encontramos el índice de la pregunta */
      const questionIndex = newQuestions.findIndex((question) => question.id === questionId)
      /* Obtenemos la información de la pregunta */
      const questionInfo = newQuestions[questionIndex]
      /* Averiguamos si el usuario ha seleccionado la respuesta correcta */
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      if (isCorrectUserAnswer) confetti();
      /* Cambiar esta información en la copia de la pregunta */
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      }
      set({ questions: newQuestions }, false, 'SELECT_ANSWER')
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1;

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION')
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] }, false, 'RESET')
    }
  }
}, {
  name: 'questions', //le damos un nombre a lo que queremos persistir
  //getStorage: () => localStorage // indica dónde lo queremos guardar, por defecto es localStorage.
})))