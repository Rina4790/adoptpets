import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addSyntheticLeadingComment } from "typescript";
import { ThemeContext } from "../../context/ThemeContext";
import { addPetInHome } from "../../redux/actions/authActions";

import { deletePet, fetchPet } from "../../redux/actions/petActions";
import { fetchPetPost, fetchPost } from "../../redux/actions/postsActions";
import { IState } from "../../redux/store";
import { petsFetch } from "../../services/helpers";

import { PostCard } from "../Post/PostCard";
import { Tooltip } from "../Tooltip/Tooltip";
import styles from "./PetsProfile.module.css";

export const Pet = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const id = useSelector((state: IState) => state.authReducer.id);
  const pet = useSelector((state: IState) => state.petsReducer.pet);
  const posts = useSelector((state: IState) => state.postsReducer.posts);

  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
console.log(petId)
  
const addHome = (id: number) => {
	dispatch(addPetInHome(id))
}

  const deletePostId = (id: string) => {
    petsFetch(`https://api2.adoptpets.click/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(() => {
      if (petId) {
        dispatch(fetchPetPost(petId));
      }
    });
  };

 
	
  useEffect(() => {
    if (petId) {
      dispatch(fetchPet(petId));
      sessionStorage.setItem("petId", petId);
    }
    return () => {
      dispatch(deletePet());
    };
  }, []);

  useEffect(() => {
    if (petId) {
      dispatch(fetchPetPost(petId));
    }
  }, []);

  return pet ? (
    <>
      <div
        style={{
          color: theme.text,
        }}
      >
        <div>
          <h3>{pet.name}</h3>
          <img src={pet.image} className={styles.avatar}></img>
          <div className={styles.petCard}>
            <div> Cat or dog: {pet.species}</div>
            <div>
              {" "}
              Boy or girl:{" "}
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
              Does the pet have a home?{" "}
              {pet.has_home === true ? (
                <>
                  {" "}
                  <img src="/images/homeFill.svg"></img> <span>Yes</span>
                </>
              ) : (
                <>
                  <img src="/images/home.svg"></img>{" "}
                  <span>No, this pet is looking for a home.</span>
                </>
              )}
            </div>
            <div> About pet: {pet.description}</div>
            <div> Country: {pet.country}</div>
            <div> City: {pet.city}</div>
            {id !== pet.owner_id ? (
              <div className={styles.owner_id}>
                <p>Pet owner: </p>
                <div>
                  <Tooltip text="Go to user's page">
                    <img
                      src="/images/user.svg"
                      onClick={() => {
                        navigate("/users/" + pet.owner_id);
                      }}
                      className={styles.owner_id_img}
                    ></img>
                  </Tooltip>
                </div>
              </div>
            ) : null}

            {id !== pet.owner_id && !pet.has_home ? (
              <div className={styles.owner_id}>
                <p>Add pet to home </p>
                <img
                  src="/images/ph.svg"
                  onClick={() => {
							addHome(pet.id);
						 }}
                  className={styles.owner_id_img}
                ></img>
              </div>
            ) : null}
          </div>
        </div>

        <div>
          {id === pet.owner_id ? (
            <div>
            	<Tooltip text="Add new post">
	            	<img
		              src="/images/add.svg"
		              onClick={() => {
		                navigate("/addpost");
		              }}
		              className={styles.buttonAdd}
		            ></img>
	            </Tooltip>
            </div>
          ) : null}

          {posts.map ? (
            <>
              <div className={styles.posts}>
                {posts.map((item) => (
                  <div className={styles.postCard}>
                    {id === pet.owner_id ? (
                      <div
                        onClick={() => {
                          deletePostId(item.id);
                        }}
                      >
                        x
                      </div>
                    ) : null}
                    <Link
                      key={item.id}
                      to={`/img/${item.id}`}
                      state={{ backgroundLocation: location }}
                    >
                      <PostCard
                        key={item.id + Math.random().toString(16).slice(2)}
                        images={item.images}
                        owner_id={item.owner_id}
                        text={item.text}
                        time={item.time}
                        id={item.id}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noPostsTitle}>NO posts...</div>
          )}
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
};
