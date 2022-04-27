import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

import { fetchPets } from "../../redux/actions/petActions";
import { IState } from "../../redux/store";
import { petsFetch } from "../../services/helpers";
import { Container } from "../Blobs/Blobs";
import { Button } from "../Button/Button";
import styles from "./UserProfile.module.css";

export interface IProfileCard {
  id: number;
  username: string;
  petnames: ["string", "string"];
  image: string;
  addrCountry: string;
  addrCity: string;
  description: string;
  contacts: string;
  onClick: () => void;
}

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pets = useSelector((state: IState) => state.petsReducer.pets);
  const count = useSelector((state: IState) => state.petsReducer.count);
	const user = useSelector((state: IState) => state.authReducer);
	const petInHome = useSelector((state: IState) => state.authReducer.petInHome);
	console.log(petInHome)

  useEffect(() => {
    dispatch(fetchPets());
  }, []);

  const { theme } = useContext(ThemeContext);

  const deletePet = (id: number) => {
    petsFetch(`https://api2.adoptpets.click/pets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };

  const { isDark } = useContext(ThemeContext);

  return (
    <Container>
      <div className={styles.userProfile}>
        <div style={{
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
                  <img
                    onClick={() => {
                      navigate("/update");
                    }}
                    src={isDark ? "/images/penW.svg" : "/images/pen.svg"}
                    alt="filter"
                  />
                </div>
                {user.email}
              </div>
            </div>

            <div
              className={styles.userContact}
              style={{
                color: theme.grayText,
              }}
            >
              <div>Country: {user.country}</div>
              <div>State: {user.state}</div>
              <div>City: {user.city}</div>
              <div>Address: {user.address}</div>
              <div>Phone: {user.phone}</div>
            </div>
          </div>
        </div>
        <div
          className={styles.petsContainer}
          style={{
            color: theme.grayText,
          }}
        >
          My pets
          <div className={styles.cardImage}>
            <div className={styles.cardNewPet}>
              <div
                className={styles.cardNewPetHeader}
                style={{
                  backgroundColor: theme.postBackground,
                }}
              >
                Add new pet
              </div>
              <div
                className={
                  isDark
                    ? `${styles.cardNewPetAdd} ${styles.cardNewPetAdd_black}`
                    : `${styles.cardNewPetAdd}`
                }
              >
                <img
                  onClick={() => {
                    navigate("/addpet");
                  }}
                  src={isDark ? "/images/plus.svg" : "/images/plusbl.svg"}
                  alt="filter"
                />
              </div>
            </div>

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
