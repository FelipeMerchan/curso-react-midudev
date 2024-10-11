import { IconButton, Stack } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { type Question } from "./types";

const Question = ({ info }: { info: Question }) => {
  return null;
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  return <Question info={questionInfo} />;
};
