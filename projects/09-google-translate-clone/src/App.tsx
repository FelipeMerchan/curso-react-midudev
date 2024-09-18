import { useEffect } from "react";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "./constants";
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    fromLanguage,
    fromText,
    interchangeLanguage,
    isLoading,
    result,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
    toLanguage,
  } = useStore();
  const debouncedFromText = useDebounce(fromText, 350);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (debouncedFromText === "") return;

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        /* Los 2 iguales en TypeScript tienen un uso especial porque va a comprar si es null
      o undefined: */
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult("Error");
      });
  }, [debouncedFromText, fromLanguage, setResult, toLanguage]);

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={setFromLanguage}
              type={SectionType.From}
              value={fromLanguage}
            />
            <TextArea
              onChange={setFromText}
              type={SectionType.From}
              value={fromText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguage}
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              onChange={setToLanguage}
              type={SectionType.To}
              value={toLanguage}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                isLoading={isLoading}
                onChange={setResult}
                type={SectionType.To}
                value={result}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
