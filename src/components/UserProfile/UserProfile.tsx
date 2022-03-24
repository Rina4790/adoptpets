import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPets } from "../../redux/actions/petActions";
import { IState } from "../../redux/store";
import { petsFetch } from "../../services/helpers";
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
  const history = useHistory();
  const dispatch = useDispatch();
  const pets = useSelector((state: IState) => state.petsReducer.pets);
  const count = useSelector((state: IState) => state.petsReducer.count);

  useEffect(() => {
    dispatch(fetchPets());
  }, []);

  return (
    <div className={styles.userProfile}>
      <div className={styles.userContainer}>
        <div className={styles.userWrapper}>
          <div className={styles.cardImage}>
            <img
              src="./images/add.svg"
              onClick={() => {
                history.push("/addpet");
              }}
              className={styles.buttonAdd}
            ></img>

            {pets.length ? (
              <div className={styles.petList}>
                {pets.map((item) => (
                  <div
                    onClick={() => {
                      history.push("/pet/" + item.id);
                    }}
                    className={styles.petCard}
                  >
                    <div className={styles.petName}>{item.name}</div>
                    <div className={styles.petPicture}>
                      <img src={item.image} className={styles.petImg}></img>
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
