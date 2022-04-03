import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PostCard } from "../Post/PostCard";
import styles from "./PostList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { fetchPost, fetchPosts } from "../../redux/actions/postsActions";
import { ThemeContext } from "../../context/ThemeContext";
import { Modal } from "../Modal/Modal";
import { Comments } from "../Modal/Comments";
import { petsFetch } from "../../services/helpers";

export const PostList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useSelector((state: IState) => state.authReducer.id);
  const posts = useSelector((state: IState) => state.postsReducer.posts);
  const post = useSelector((state: IState) => state.postsReducer.post);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const comments = useSelector(
    (state: IState) => state.postsReducer.post.comments
  );
  const [textComment, setTextComment] = useState<string>("");

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
    dispatch(fetchPosts());
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

  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={styles.allPosts}>
        {posts ? (
          <>
            <div className={styles.postList}>
              {posts.map((item) => (
                <div>
                  <div className={styles.petInfo}>
                    <img
                      src={item.avatar}
                      className={styles.avatar}
                      onClick={() => {
                        history.push("/pet/" + item.owner_id);
                      }}
                    ></img>
                    <div
                      onClick={() => {
                        history.push("/pet/" + item.owner_id);
                      }}
                      className={styles.petName}
                      style={{
                        color: theme.grayText,
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                  <div>
                    <PostCard
                      key={item.id}
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
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noPostsTitle}>NO posts...</div>
        )}
      </div>
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
    </>
  );
};
