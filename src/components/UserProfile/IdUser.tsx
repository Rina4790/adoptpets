import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { userId } from "../../redux/actions/userActions";
import styles from "./UserProfile.module.css";
import { IState } from "../../redux/store";
import { Container } from "../Blobs/Blobs";

export const IdUser = () => {
  const { usserId } = useParams<"usserId">();
  const user = useSelector((state: IState) => state.userReducer.user);
  const dispatch = useDispatch();
  const pets = useSelector((state: IState) => state.userReducer.user.pets);
  const { theme } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userId(String(usserId)));
  }, []);

  return (
    <Container>
      <div className={styles.userProfile}>
        <div style={{
                          height: "450px",
                          backgroundColor: theme.postBackground,
                        }}
				  className={styles.userContainer}
            
        >
          <div className={styles.userWrapper}>
            <div className={styles.userDataCentr}>
              <div
                className={
                  isDark
                    ? `${styles.userData} ${styles.userDataBlack}`
                    : `${styles.userData}`
                }
                style={{
                  color: theme.grayText,
                }}
              >
                <img
                  src={isDark ? "/images/user.svg" : "/images/userbl.svg"}
                  alt="filter"
                />
                <div className={styles.userName}>
                  {user.username}
                 
                </div>
                {/* {user.email} */}
              </div>
            </div>

            <div
              className={styles.userContact}
              style={{
                color: theme.grayText, height: "200px"
              }}
            >
              <div>Country: {user.country}</div>
              <div>State: {user.state}</div>
              <div>City: {user.city}</div>
              {/* <div>Address: {user.address}</div> */}
              {/* <div>Phone: {user.phone}</div> */}
            </div>
          </div>
        </div>
        <div
          className={styles.petsContainer}
          style={{
            color: theme.grayText,
          }}
        >
          User`s pets
          <div className={styles.cardImage}>
            {pets.length ? (
              <div className={styles.petList}>
                {pets.map((item) => (
                  <div className={styles.petContainer}>
                    <div
                      onClick={() => {
                        navigate("/pet/" + item.id);
                      }}
                      className={styles.petCard}
                    >
                      <div
                        className={styles.cardNewPetHeader}
                        style={{
                          color: theme.grayText,
                          backgroundColor: theme.postBackground,
                        }}
                      >
                        {item.name}
                      </div>
                      <div className={styles.cardMyPet}>
                        <img
                          src={item.image}
                          className={styles.cardMyPet}
                        ></img>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
};
