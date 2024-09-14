import { type FC } from "react";
import { Form } from "react-bootstrap";

import { SUPPORTED_LANGUAGES } from "../constants";
import { type FromLanguage, type Language } from "../types";

type Props =
  | {
      type: "from";
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: "to"; value: Language; onChange: (language: Language) => void };

/* La forma más recomendada de tipar las props es usar React.FC: */
export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      onChange={handleChange}
      value={value}
    >
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={literal}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
