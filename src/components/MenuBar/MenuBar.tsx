import styles from "./MenuBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { Button } from "../Button/Button";

interface IProps {
  closeMenuBar: () => void;
}

export const MenuBar = ({ closeMenuBar }: IProps) => {
  const { isDark, changeIsDark } = useContext(ThemeContext);
  const { isLoggedIn } = useSelector((state: IState) => state.authReducer);

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    setTimeout(() => {
      history.replace("/");
      window.location.reload();
    }, 1000);
  };

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
              <img src="/images/home.svg"></img>
            </li>
            {isLoggedIn ? (
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
            ) : null}

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
            {isLoggedIn ? (
              <li>
                <Button onClick={handleLogout}>LogOut</Button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};
