import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PostCard } from "../Post/PostCard";
import { Button } from "../Button/Button";

import styles from "./PostList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IState, store } from "../../redux/store";
import {
  
  fetchPosts,
  
} from "../../redux/actions/postsActions";
import { Input } from "../Input/Input";




export const PostList = () => {
  const history = useHistory();
  const dispatch = useDispatch();


  const posts = useSelector((state: IState) => state.postsReducer.posts);
  const count = useSelector((state: IState) => state.postsReducer.count);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  

  

  return (
    <>
      
      
        
        <div className={styles.allPosts}>
          

          {posts ? (
            <>
              <div className={styles.postList}>
                {posts.map((item) => (
                  <PostCard
                    key={item.id + Math.random().toString(16).slice(2)}
                    images={item.images}
                    owner_id={item.owner_id}
                    text={item.text}
                    time={item.time}
                    id={item.id}
                  //   onClick={() => {
                  //     history.push("/post/" + item.id);
                  //   }}
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
      
      
    </>
  );
};