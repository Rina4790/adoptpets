import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PostCard } from "../Post/PostCard";
import styles from "./PostList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { fetchPosts, searchPosts } from "../../redux/actions/postsActions";
import { ThemeContext } from "../../context/ThemeContext";
import { SearchBar } from "../Search/Search";

export const PostList = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();
  const posts = useSelector((state: IState) => state.postsReducer.posts);
  const { isLoggedIn } = useSelector((state: IState) => state.authReducer);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const openSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
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
                        navigate("/pet/" + item.owner_id);
                      }}
                    ></img>
                    <div
                      onClick={() => {
                        navigate("/pet/" + item.owner_id);
                      }}
                      className={styles.petName}
                      style={{
                        color: theme.grayText,
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
						  <div className={styles.postLink}>
							  {item.liked ? (<img src="/images/like2.svg" className={styles.icon}></img>) : 
							  (<img src="/images/like.svg" className={styles.icon}></img>)}
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
    </>
  );
};
