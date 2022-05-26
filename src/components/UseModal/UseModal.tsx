import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./UseModal.module.css";

interface IProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const UseModal = ({ children, isVisible, onClose }: IProps) => {
	const { theme } = useContext(ThemeContext);

  return isVisible ? (
    <>
      <div className={styles.background} onClick={onClose}></div>
		  <div className={styles.inner} style={{
            background: theme.background,
          }}>
			  {children}
		  </div>
    </>
  ) : null;
};
