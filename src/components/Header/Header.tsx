import styles from "./Header.module.css";

import { useCallback, useContext, useState } from "react";
import { Button } from "../Button/Button";
import { MenuBar } from "../MenuBar/MenuBar";
import { fetchPosts } from "../../redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import { IState } from "../../redux/store";

export const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isLog = localStorage.getItem("access");
  const { isLoggedIn } = useSelector((state: IState) => state.authReducer);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
	const { isDark, changeIsDark } = useContext(ThemeContext);
	const petInHome = useSelector((state: IState) => state.authReducer.petInHome);

  const closeMenuBar = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);
	
  const handleLogout = () => {
	localStorage.removeItem("access");
	localStorage.removeItem("username");

	setTimeout(() => {
	  navigate("/");
	  window.location.reload();
	}, 1000);
 };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerBlock}>
          <div className={styles.logoandmenu}>
            <div
              className={styles.logoBlock}
              onClick={() => {
                dispatch(fetchPosts());
                navigate("/");
              }}
            >
              <img src="/images/logo.svg" alt="logo" className={styles.logo} />
              <h4>adoptpets</h4>
            </div>
          </div>
        </div>
        <div className={styles.menuUser}>
          <div className={styles.navlink}>
			 <NavLink to="/aboutUs" >
                About Us
              </NavLink>
				  </div>
				  <div className={styles.navlink}>
			 <NavLink to="/donations" >
			 Donations
              </NavLink>
				  </div>
				  {isLog ? (
              
              <NavLink to="/pethome" >
                {petInHome ? (
                  <img className={styles.home} src="/images/homeFill.svg"></img>
                ) : (
                  <img className={styles.home} src="/images/home.svg"></img>
                )}
              </NavLink>
            
				  ) : null}
				  {isLog ? (
              
                <NavLink to="/favorite" >
                  <img className={styles.favor} src="/images/favor.svg"></img>
                </NavLink>
              
            ) : null}
          <div className={styles.user}>
            {isLog ? (
              <div
                className={styles.userInfo}
                onClick={() => {
                  navigate("/userProfile");
                }}
              >
                <img
                  src="/images/user.svg"
                  alt="user"
                  className={styles.userImg}
                />
							  <div className={styles.userName}>{username}</div>
							  <img className={styles.logout} src="/images/logout.svg" onClick={handleLogout}></img>
						  </div>
						  
            ) : (
              <>
                <button className={styles.buttonLogin}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                
              </>
            )}
          </div>
          <div>
            <ThemeToggle
              inputChecked={isDark}
              onChange={() => {
                changeIsDark();
              }}
            />
          </div>
        </div>
      </div>
      {isActive ? <MenuBar closeMenuBar={closeMenuBar} /> : null}
    </>
  );
};
