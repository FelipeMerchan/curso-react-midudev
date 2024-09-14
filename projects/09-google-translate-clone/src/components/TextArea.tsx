import { type FC } from "react";
import { Form } from "react-bootstrap";

import { SectionType } from "../types.d";

interface Props {
  isLoading?: boolean;
  onChange: (value: string) => void;
  type: SectionType;
  value: string;
}

const commonStyles = { border: 0, height: "200px", resize: "none" };

const getPlaceholder = ({
  type,
  isLoading,
}: {
  type: SectionType;
  isLoading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (isLoading === true) return "Cargando...";

  return "Traducción";
};

export const TextArea: FC<Props> = ({ isLoading, onChange, type, value }) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      placeholder={getPlaceholder({ type, isLoading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
