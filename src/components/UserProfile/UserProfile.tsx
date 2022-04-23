import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

import { fetchPets } from "../../redux/actions/petActions";
import { IState } from "../../redux/store";
import { petsFetch } from "../../services/helpers";
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

  return (
    <div className={styles.userProfile}>
      <div className={styles.userContainer}>
        <div className={styles.userWrapper}>
          <Button
            onClick={() => {
              navigate("/update");
            }}
          >
            update Profile
          </Button>
          <div className={styles.cardImage}>
            <img
              src="./images/add.svg"
              onClick={() => {
                navigate("/addpet");
              }}
              className={styles.buttonAdd}
            ></img>

            {pets.length ? (
              <div className={styles.petList}>
                {pets.map((item) => (
                  <div className={styles.petContainer}>
                    <div>
                      <img
                        src="./images/delete.svg"
                        className={styles.petDelete}
                        onClick={() => {
                          deletePet(item.id);
                        }}
                      ></img>
                    </div>
                    <div
                      onClick={() => {
                        navigate("/pet/" + item.id);
                      }}
                      className={styles.petCard}
                    >
                      <div
                        className={styles.petName}
                        style={{
                          color: theme.grayText,
                        }}
                      >
                        {item.name}
                      </div>
                      <div className={styles.petPicture}>
                        <img src={item.image} className={styles.petImg}></img>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
