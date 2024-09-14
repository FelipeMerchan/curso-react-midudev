import { type FC } from "react";
import { Form } from "react-bootstrap";

import { SUPPORTED_LANGUAGES } from "../constants";

interface Props {
  onChange: (language: string) => void;
}

/* La forma más recomendada de tipar las props es usar React.FC: */
export const LanguageSelector: FC<Props> = ({ onChange }) => {
  return (
    <Form.Select aria-label="Selecciona el idioma">
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={literal}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
