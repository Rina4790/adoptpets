import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { deletePet, fetchPet } from "../../redux/actions/petActions";
import { fetchPetPost } from "../../redux/actions/postsActions";
import { IState } from "../../redux/store";
import { PostCard } from "../Post/PostCard";
import styles from "./PetsProfile.module.css"

export const Pet = () => {
  const params: { petId: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

	const pet = useSelector((state: IState) => state.petsReducer.pet);
	const posts = useSelector((state: IState) => state.postsReducer.posts);
	const count = useSelector((state: IState) => state.postsReducer.count);

  useEffect(() => {
    dispatch(fetchPet(params.petId));

    return () => {
      dispatch(deletePet());
    };
  }, []);
	
  useEffect(() => {
	dispatch(fetchPetPost(params.petId));
 }, []);
 

  return pet.name ? (
    <div>
      <h4>{pet.name}</h4>
      <img src={pet.image} className={styles.avatar}></img>
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
		  
		  <div >
          

          {posts.map ? (
            <>
              <div >
                {posts.map((item) => (
                  <PostCard
                    key={item.id + Math.random().toString(16).slice(2)}
                    images={item.images}
                    owner_id={item.owner_id}
                    text={item.text}
                    time={item.time}
                    id={item.id}
                    onClick={() => {
                      history.push("/post/" + item.id);
                    }}
                  />
                ))}
              </div>

             
            </>
          ) : (
            <div className={styles.noPostsTitle}>
              NO posts...
            </div>
          )}
        </div>

    </div>
  ) : (
    <div></div>
  );
};
