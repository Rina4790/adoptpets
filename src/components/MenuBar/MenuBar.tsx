import styles from "./MenuBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
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
  const petInHome = localStorage.getItem("petInHome");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");

    setTimeout(() => {
      navigate("/");
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
					  {isLoggedIn ? (
              <li>
              <NavLink to="/pethome" onClick={closeMenuBar}>
                {petInHome ? (
                  <img src="/images/homeFill.svg"></img>
                ) : (
                  <img src="/images/home.svg"></img>
                )}
              </NavLink>
            </li>
            ) : null}
            
            {isLoggedIn ? (
              <li>
                <NavLink to="/userProfile" onClick={closeMenuBar}>
                  My Prolile
                </NavLink>
              </li>
					  ) : null}
					  
					  {isLoggedIn ? (
              <li>
                <NavLink to="/favorite" onClick={closeMenuBar}>
                  My favorite posts
                </NavLink>
              </li>
            ) : null}

            <li>
              <NavLink to="/aboutUs" onClick={closeMenuBar}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/donations" onClick={closeMenuBar}>
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
