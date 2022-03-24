import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useState,
} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Input.module.css";

interface IProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  type?: string;
  label?: string;
  error?: string;
}

export const Input = ({
  type = "text",
  label,
  value,
  error,
  onChange,
  onKeyDown,
}: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext);

  return (
    <label className={styles.label}>
      {" "}
      {label ? <p>{label}</p> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          color: theme.colorOfTextInput,
          border: theme.borderOfButton,
        }}
        className={`${styles.input} ${error ? styles.error : ""} ${
          isDark ? styles.input_dark : styles.input
        }`}
        onKeyDown={onKeyDown}
      />
      {error ? <p>{error}</p> : null}
    </label>
  );
};
