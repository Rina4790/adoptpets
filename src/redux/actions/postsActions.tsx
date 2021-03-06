import { useState } from "react";
import { Dispatch } from "redux";
import { petsFetch } from "../../services/helpers";

import { getPosts, getPostsLike } from "../../services/posts";
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
      postsReducer: {},
    } = getState();
    {
      const result = await getPosts();
      dispatch(addPosts(result, result.count));
    }
  };
};

export const fetchPostsLike = () => {
	return async (dispatch: Dispatch, getState: () => IState) => {
	  const {
		 postsReducer: {},
	  } = getState();
	  {
		 const result = await getPostsLike();
		 dispatch(addPosts(result, result.count));
	  }
	};
 };

export const fetchPetPost = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await petsFetch(
      `https://api2.adoptpets.click/pets/${id}/posts`
    );
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
    const response = await petsFetch("https://api2.adoptpets.click/posts/" + id);
    const post = await response.json();
    dispatch(addPost(post));
  };
};

export const deletePost = () => {
  return { type: ACTIONS.DELETE_POST };
};

export const searchPosts = (
  species: string,
  gte_date: string,
  sex: string,
  country: string,
  city: string,
  has_home: boolean,
	isLoggedIn: boolean,
	hasHomeStr:string
) => {
  let url = `https://api2.adoptpets.click/search?offset=0&limit=100`;
  {species !== "" ? (url = url + `&species=${species}`) : (url = url + "");}
	{ sex !== "" ? (url = url + `&sex=${sex}`) : (url = url + ""); }
	{ gte_date !== "" ? (url = url + `&gte_date=${gte_date}`) : (url = url + ""); }
	{ country !== "" ? (url = url + `&country=${country}`) : (url = url + ""); }
	{ city !== "" ? (url = url + `&city=${city}`) : (url = url + ""); }
	{ hasHomeStr !== "" ? (url = url + `&has_home=${has_home}`) : (url = url + ""); }
  if (isLoggedIn) {
    return async (dispatch: Dispatch, getState: () => IState) => {
      const {
        postsReducer: {},
      } = getState();
      {
        const response = await petsFetch(url);
        const result = await response.json();
        dispatch(addPosts(result, result.count));
      }
    };
  } else {
    return async (dispatch: Dispatch, getState: () => IState) => {
      const {
        postsReducer: {},
      } = getState();
      {
        const response = await fetch(url);
        const result = await response.json();
        dispatch(addPosts(result, result.count));
      }
    };
  }
};

// `https://api2.adoptpets.click/search?offset=0&limit=100&species=${species}&gte_date=${gte_date}&sex=${sex}&country=${country}&city=${city}&has_home=${has_home}`
