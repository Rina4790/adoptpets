import { Dispatch } from "redux";

import { getPosts } from "../../services/posts";
import { ACTIONS } from "../constants";
import { IPost } from "../redusers/postsReduser";
import { IState } from "../store";

export const addPosts = (posts: IPost[], count: number) => {
  return {
    type: ACTIONS.ADD_POSTS,
    posts: posts,
    count,

  };
};

export const addPetPosts = (posts: IPost[], count: number) => {
	return {
	  type: ACTIONS.ADD_POSTS,
	  posts: posts,
	  count,
	};
 };

export const fetchPosts = () => {
  return async (dispatch: Dispatch, getState: () => IState) => {
    const {
      postsReducer: {  },
    } = getState();

    // const state = getState();
    // const { postsReducer } = state;
    // const { offset } = postsReducer;

     {
      const result = await getPosts();

      dispatch(addPosts(result, result.count));
    }
  };
};

export const fetchPetPost = (id: string) => {
	return async (dispatch: Dispatch) => {
	  const response = await fetch(`https://api2.adoptpets.click/pets/${id}/posts` );
	  const petPosts = await response.json();
 
	  dispatch(addPetPosts(petPosts, petPosts.count));
	};
 };

export const addPost = (post: IPost) => {
  return {
    type: ACTIONS.ADD_POST,
    post: post,
  };
};

export const fetchPost = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      "https://api2.adoptpets.click/posts/" + id
    );
    const post = await response.json();

    dispatch(addPost(post));
  };
};

export const deletePost = () => {
  return { type: ACTIONS.DELETE_POST };
};


