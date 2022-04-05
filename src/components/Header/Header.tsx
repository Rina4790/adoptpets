import styles from "./Header.module.css";
import { useHistory } from "react-router-dom";

import { useCallback, useState } from "react";
import { Button } from "../Button/Button";
import { MenuBar } from "../MenuBar/MenuBar";
import { fetchPosts } from "../../redux/actions/postsActions";
import { useDispatch } from "react-redux";

export const Header = () => {
  const history = useHistory();
  const username = localStorage.getItem("username");
  const isLog = localStorage.getItem("access");
	const [isActive, setIsActive] = useState(false);
	const dispatch = useDispatch();

  const closeMenuBar = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.containerHeader}>
          <div className={styles.headerBlock}>
            <div className={styles.logoandmenu}>
              <div
                className={styles.logoBlock}
							  onClick={() => {
								dispatch(fetchPosts())
                  history.push("/");
                }}
              >
                <img src="/images/paw.svg" alt="menu" className={styles.logo} />
                <h4>adoptpets</h4>
              </div>
            </div>
            {/* <div className={styles.searchContaiter}>
              <img
                src="/images/search.svg"
                alt="menu"
                className={styles.search}
                onClick={() => {}}
              />
              <p>Search</p>
            </div> */}
          </div>
          <div className={styles.menuUser}>
            <div className={styles.menuContaiter}>
              <img
                src={isActive ? "/images/open.svg" : "/images/options.svg"}
                alt="menu"
                className={styles.menu}
                onClick={() => setIsActive(!isActive)}
              />
            </div>
            <div className={styles.user}>
              {isLog ? (
                <div
                  className={styles.userInfo}
                  onClick={() => {
                    history.push("/userProfile");
                  }}
                >
                  <img
                    src="/images/user.svg"
                    alt="user"
                    className={styles.userImg}
                  />
                  <div>{username}</div>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/registration");
                    }}
                  >
                    Registration
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isActive ? <MenuBar closeMenuBar={closeMenuBar} /> : null}
    </>
  );
};
