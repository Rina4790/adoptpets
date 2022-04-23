import { useContext, useEffect, useState } from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { PostCard } from "../Post/PostCard";
import styles from "./PostList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import {

  fetchPostsLike,

} from "../../redux/actions/postsActions";
import { ThemeContext } from "../../context/ThemeContext";


export const FavoritePosts = () => {
  
	const dispatch = useDispatch();
	let location = useLocation();
	let state = location.state as { backgroundLocation?: Location };
	const navigate = useNavigate();
  const posts = useSelector((state: IState) => state.postsReducer.posts);
const [postsArr, setPostsArr]=useState(posts)
	
  useEffect(() => {
	  dispatch(fetchPostsLike());
	  setPostsArr(posts)
  }, [posts]);

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
						  <div>
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
