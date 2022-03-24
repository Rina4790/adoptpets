import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Button.module.css";

interface IProps {
  children: any;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        background: theme.colorOfButton,
        border: theme.borderOfButton,
      }}
      className={isDark ? `${styles.btn} ${styles.btn_dark}` : `${styles.btn}`}
    >
      {children}
    </button>
  );
};
