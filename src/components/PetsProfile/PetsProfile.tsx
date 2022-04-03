import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { deletePet, fetchPet } from "../../redux/actions/petActions";
import { fetchPetPost, fetchPost } from "../../redux/actions/postsActions";
import { IState } from "../../redux/store";
import { petsFetch } from "../../services/helpers";
import { Comments } from "../Modal/Comments";
import { Modal } from "../Modal/Modal";
import { PostCard } from "../Post/PostCard";
import styles from "./PetsProfile.module.css";

export const Pet = () => {
  const params: { petId: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const id = useSelector((state: IState) => state.authReducer.id);
  const pet = useSelector((state: IState) => state.petsReducer.pet);
  const posts = useSelector((state: IState) => state.postsReducer.posts);
  const post = useSelector((state: IState) => state.postsReducer.post);
  const comments = useSelector(
    (state: IState) => state.postsReducer.post.comments
  );
  const [textComment, setTextComment] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (id: string) => {
    document.body.classList.add("modalShow");
    dispatch(fetchPost(id));
    sessionStorage.setItem("postId", id);
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
    document.body.classList.remove("modalShow");
  };

  useEffect(() => {
    dispatch(fetchPet(params.petId));
    sessionStorage.setItem("petId", params.petId);
    return () => {
      dispatch(deletePet());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchPetPost(params.petId));
  }, []);

  const addComment = () => {
    const post_id = sessionStorage.getItem("postId");
    if (textComment !== "") {
      petsFetch("https://api2.adoptpets.click/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textComment, owner_id: id, post_id }),
      });
      setTextComment("");
      if (post_id) {
        setTimeout(() => {
          dispatch(fetchPost(post_id));
        }, 1000);
      }
    }
  };

  return pet.name ? (
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
          </div>
        </div>

        <div>
          {id === pet.owner_id ? (
            <img
              src="/images/add.svg"
              onClick={() => {
                history.push("/addpost");
              }}
              className={styles.buttonAdd}
            ></img>
          ) : null}

          {posts.map ? (
            <>
              <div className={styles.posts}>
                {posts.map((item) => (
                  <div className={styles.postCard}>
                    <PostCard
                      key={item.id + Math.random().toString(16).slice(2)}
                      images={item.images}
                      owner_id={item.owner_id}
                      text={item.text}
                      time={item.time}
                      id={item.id}
                      onClick={() => {
                        openModal(item.id);
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noPostsTitle}>NO posts...</div>
          )}
        </div>
      </div>
      {post.images ? (
        <Modal
          isVisible={isModalVisible}
          onClose={onClose}
          key={post.id}
          images={post.images}
          text={post.text}
          id={post.id}
          avatar={post.avatar}
          name={post.name}
          time={post.time}
          value={textComment}
          onChange={(event) => setTextComment(event.target.value)}
          onClick={addComment}
        >
          <>
            {comments.map((item) => (
              <Comments
                text={item.text}
                id={item.id}
                time={item.time}
                owner_id={item.owner_id}
                post_id={item.post_id}
                username={item.username}
              />
            ))}
          </>
        </Modal>
      ) : (
        <div className={styles.preloader}></div>
      )}
    </>
  ) : (
    <div></div>
  );
};
