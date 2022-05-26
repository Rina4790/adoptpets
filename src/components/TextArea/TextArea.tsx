import { ChangeEventHandler, KeyboardEventHandler, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./TextArea.module.css";

interface IProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  label?: string;
  error?: string;
}

export const TextArea = ({ label, value, error, onChange }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext);
  return (
    <label className={styles.label}>
      {" "}
      {label ? <p style={{color: theme.timeText}}>{label}</p> : null}
      <textarea
        value={value}
        onChange={onChange}
        style={{
          color: theme.colorOfTextInput,
         
        }}
        className={`${styles.input} ${error ? styles.error : ""} ${
          isDark ? styles.input_dark : styles.input
        }`}
      />
      {error ? <p>{error}</p> : null}
    </label>
  );
};
