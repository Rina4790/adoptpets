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
import { Container } from "../Blobs/Blobs";
import { Button } from "../Button/Button";

import { PostCard } from "../Post/PostCard";
import { Tooltip } from "../Tooltip/Tooltip";
import { UseModal } from "../UseModal/UseModal";
import styles from "./PetsProfile.module.css";

export const Pet = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const id = useSelector((state: IState) => state.authReducer.id);
  const pet = useSelector((state: IState) => state.petsReducer.pet);
	const posts = useSelector((state: IState) => state.postsReducer.posts);
	const [isModalVisible, setIsModalVisible] = useState(false);

  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  console.log(petId);

  const addHome = (id: number) => {
    dispatch(addPetInHome(id));
  };

	const deletePostId = () => {
		const postId = sessionStorage.getItem("postId")
    petsFetch(`https://api2.adoptpets.click/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
	 }).then(() => {
		setIsModalVisible(false)
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

  const [postsArr, setPostsArr] = useState(posts);

  useEffect(() => {
    if (petId) {
      dispatch(fetchPetPost(petId));
      setPostsArr(posts);
    }
  }, [posts]);

  const like = (id: string) => {
    petsFetch(`https://api2.adoptpets.click/posts/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };

  const likeDelete = (id: string) => {
    petsFetch(`https://api2.adoptpets.click/posts/${id}/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };

  const { isDark } = useContext(ThemeContext);

  return pet ? (
    <Container>
      <div
        className={styles.wrapper}
        style={{
          color: theme.text,
        }}
      >
        <div className={styles.topBlock}>
          <div>
            <img src={pet.image} className={styles.avatar}></img>
          </div>
          <div className={styles.name}>
            <div className={styles.name_update}>
              <h2>{pet.name}</h2>
              {id === pet.owner_id ? (
                <img
                  className={styles.pen}
                  onClick={() => {
                    navigate("/update");
                  }}
                  src={isDark ? "/images/penW.svg" : "/images/pen.svg"}
                  alt="filter"
                />
              ) : null}
            </div>
            <div className={styles.description}> {pet.description}</div>
          </div>
          <div
            className={styles.petCard}
            style={{
              background: theme.postBackground,
            }}
          >
            <div> Kind: {pet.species}</div>
            <div>
              {" "}
              Gender:{" "}
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
            <div>Age: {pet.birth_date}</div>
            <div> Country: {pet.country}</div>
            <div> City: {pet.city}</div>
            <div>
              {pet.has_home === true ? (
                <div className={styles.pet_home}>
                  {" "}
                  <img
                    src={
                      isDark
                        ? "/images/homeFill.svg"
                        : "/images/homeFill_bl.svg"
                    }
                  ></img>{" "}
                  <span>This pet has a home</span>
                </div>
              ) : (
                <div className={styles.pet_home}>
                  <img
                    src={
                      isDark
                        ? "/images/home.svg"
                        : "/images/home_bl.svg"
                    }
                  ></img>{" "}
                  <span>This pet is looking for a home.</span>
                </div>
              )}
            </div>

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
          {posts.map ? (
            <>
              <div className={styles.allPosts}>
                {id === pet.owner_id ? (
                  <div>
                    <img
                      src={isDark ? "/images/plus.svg" : "/images/plusbl.svg"}
                      onClick={() => {
                        navigate("/addpost");
                      }}
                      className={styles.buttonAdd}
                    ></img>
                  </div>
                ) : null}
                {posts.map((item) => (
                  <div
                    className={styles.group}
                    style={{
                      backgroundColor: theme.postBackground,
                    }}
                  >
							 <div className={styles.petInfo}>
							 {item.liked ? (
                        <img
                          onClick={() => {
                            likeDelete(item.id);
                          }}
                          src="/images/like2.svg"
                          className={styles.icon}
                        ></img>
                      ) : (
                        <img
                          onClick={() => {
                            like(item.id);
                          }}
                          src={
                            isDark ? "/images/like1.svg" : "/images/like.svg"
                          }
                          className={styles.icon}
                        ></img>
                      )}
                      {id === pet.owner_id ? (
                        <img src={isDark ? "/images/plus.svg" : "/images/plusbl.svg"}
										 onClick={() => { setIsModalVisible(true); sessionStorage.setItem("postId", item.id)}}
										 className={styles.icon_delete} 
                        />
								 ) : null}
								 <UseModal isVisible={isModalVisible}
									 onClose={() => setIsModalVisible(false)}>
									 <div>
									 <h3>Delete Post?</h3>
<h4>Are you sure you want to delete this post?</h4>
									 </div>
				  <Button onClick={deletePostId}>Delete</Button>
				  <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
				  </UseModal>
                    </div>
                    <div className={styles.postLink}>
                      
                      <Link
                        key={item.id}
                        to={`/img/${item.id}`}
                        state={{ backgroundLocation: location }}
                      >
                        <PostCard
                          images={item.images}
                          owner_id={item.owner_id}
                          text={item.text}
                          time={item.time}
                          id={item.id}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noPostsTitle}>NO posts...</div>
          )}
			  </div>
			  
      </div>
    </Container>
  ) : (
    <div></div>
  );
};
