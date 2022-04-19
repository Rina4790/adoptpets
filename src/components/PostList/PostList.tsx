import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PostCard } from "../Post/PostCard";
import styles from "./PostList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import {
  deletePost,
  fetchPost,
  fetchPosts,
  searchPosts,
} from "../../redux/actions/postsActions";
import { ThemeContext } from "../../context/ThemeContext";
import { Modal } from "../Modal/Modal";
import { Comments } from "../Modal/Comments";
import { petsFetch } from "../../services/helpers";
import { SearchBar } from "../Search/Search";

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
  const { isLoggedIn } = useSelector((state: IState) => state.authReducer);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const openSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const openModal = (id: string) => {
    sessionStorage.setItem("postId", id);
    document.body.classList.add("modalShow");
    dispatch(fetchPost(id));
    setIsModalVisible(true);
    return () => {
      dispatch(deletePost());
    };
  };

  const onClose = () => {
    setIsModalVisible(false);
    sessionStorage.removeItem("postId");
    document.body.classList.remove("modalShow");
  };
  const [species, setSpecies] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [hasHomeStr, setHasHomeStr] = useState<string>("");
  let has_home: boolean;
  {
    hasHomeStr === "true" ? (has_home = true) : (has_home = false);
  }

  const [gte_date, setGteDate] = useState("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  //   useEffect(() => {
  //     dispatch(searchPosts( species, gte_date, sex, country, city, has_home, isLoggedIn));
  //   }, []);

  const search = () => {
    dispatch(
      searchPosts(
        species,
        gte_date,
        sex,
        country,
        city,
        has_home,
        isLoggedIn,
        hasHomeStr
      )
    );
  };

  const addComment = () => {
    if (id !== 0) {
      const post_id = sessionStorage.getItem("postId");
      if (textComment !== "") {
        petsFetch("https://api2.adoptpets.click/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textComment, owner_id: id, post_id }),
        }).then(() => {
          setTextComment("");
          if (post_id) {
            dispatch(fetchPost(post_id));
          }
        });
      }
    } else {
      alert("Login, please");
      setTextComment("");
    }
  };

  const { theme } = useContext(ThemeContext);
  return (
    <>
      <SearchBar
        isVisible={isSearchVisible}
        openSearchBar={openSearchBar}
        onChangeCountry={(event) => setCountry(event.target.value)}
        onChangeSpecies={(event) => setSpecies(event.target.value)}
        onChangeGender={(event) => setSex(event.target.value)}
        onChangeDate={(event) => setGteDate(event.target.value)}
        onChangeHasHome={(event) => setHasHomeStr(event.target.value)}
        onChangeCity={(event) => setCity(event.target.value)}
        onClick={search}
      />
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
