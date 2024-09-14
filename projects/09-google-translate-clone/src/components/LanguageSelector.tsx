import { type FC } from "react";
import { Form } from "react-bootstrap";

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { SectionType, type FromLanguage, type Language } from "../types.d";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (language: Language) => void;
    };

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
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={literal}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
