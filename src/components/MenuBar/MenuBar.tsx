import styles from "./MenuBar.module.css";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

interface IProps {
  closeMenuBar: () => void;
}

export const MenuBar = ({ closeMenuBar }: IProps) => {
  const { isDark, changeIsDark } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.menuBar}>
          <ul>
            <li>
              <ThemeToggle
                inputChecked={isDark}
                onChange={() => {
                  changeIsDark();
                }}
              />
            </li>
            <li>
              <img src="./images/home.svg"></img>
            </li>
            <li>
              <NavLink
                exact
                to="/userProfile"
                activeClassName={styles.activeLink}
                onClick={closeMenuBar}
              >
                My Prolile
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/aboutUs"
                activeClassName={styles.activeLink}
                onClick={closeMenuBar}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/donations"
                activeClassName={styles.activeLink}
                onClick={closeMenuBar}
              >
                Donations
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
