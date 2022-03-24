import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { deletePet, fetchPet } from "../../redux/actions/petActions";
import { IState } from "../../redux/store";

export const Pet = () => {
  const params: { petId: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const pet = useSelector((state: IState) => state.petsReducer.pet);

  useEffect(() => {
    dispatch(fetchPet(params.petId));

    return () => {
      dispatch(deletePet());
    };
  }, []);

  return pet.name ? (
    <div>
      <h4>{pet.name}</h4>
      <img src={pet.image}></img>
      <div> Cat or dog: {pet.species}</div>
      <div>
        {" "}
        Boy or girl:
        {pet.sex === "M" ? (
          <>
            <img src="/images/man.svg"></img> <span>boy</span>
          </>
        ) : (
          <>
            <img src="/images/woman.svg"></img>
            <span>girl</span>
          </>
        )}
      </div>
      <div>Date of birth (approximately) : {pet.birth_date}</div>
      <div>
        Does the pet have a home?
        {pet.has_home === true ? (
          <>
            {" "}
            <img src="/images/homeFill.svg"></img> <span>Yes</span>
          </>
        ) : (
          <>
            <img src="/images/home.svg"></img>
            <span>No, this pet is looking for a home.</span>
          </>
        )}
      </div>
      <div> About pet: {pet.description}</div>
    </div>
  ) : (
    <div></div>
  );
};
