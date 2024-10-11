import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import SyntaxReactHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { type Question } from "./types";

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  if (userSelectedAnswer == null) return "transparent";
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  if (index === correctAnswer) return "green";
  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", padding: 2, textAlign: "start", marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxReactHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxReactHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  return <Question info={questionInfo} />;
};
