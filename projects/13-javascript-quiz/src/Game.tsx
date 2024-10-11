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

const Question = ({ info }: { info: Question }) => {
  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", padding: 2, textAlign: "start" }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxReactHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxReactHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton>
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
