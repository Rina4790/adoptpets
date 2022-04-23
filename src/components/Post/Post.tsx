import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "./PostCard";

import styles from "./PostCard.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { deletePost, fetchPost } from "../../redux/actions/postsActions";

export const Post = () => {
  const {postId} = useParams<"postId">();
  
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const post = useSelector((state: IState) => state.postsReducer.post);

  useEffect(() => {
    dispatch(fetchPost(String(postId)));

    return () => {
      dispatch(deletePost());
    };
  }, []);

  return post ? (
    <div className={styles.postInfo}>
      <PostCard
        key={post.id}
        owner_id={post.owner_id}
        images={post.images}
        text={post.text}
        time={post.time}
        id={post.id}
        onClick={() => {}}
      />

      <p
        className={styles.backButton}
        style={{
          color: theme.timeText,
        }}
        
      >
        Back
      </p>
    </div>
  ) : (
    <div className={styles.preloader}></div>
  );
};
