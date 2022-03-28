import { ACTIONS } from "../constants";

export interface IPost {
	id: number;
	owner_id: number;
  images: string[];
  text: string;
  time: Date;
  
}

export interface IPostsState {
  posts: IPost[];
  post: IPost;
  count: number;
  
}

const defaultState: IPostsState = {
  posts: [],
  post: {
	  id: 0,
	  owner_id:0,
    images: [""],
    text: "",
    time: new Date,
    
  },
  count: 0,
  
};

export const postsReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ACTIONS.ADD_POSTS: {
      return {
        ...state,
        posts: action.posts,
        count: action.count,
      //   offset: action.offset,
      };
    }

    case ACTIONS.ADD_POST: {
      return { ...state, post: action.post };
    }

    case ACTIONS.DELETE_POST: {
      return {
        ...state,
        post: { id: 0, owner_id:0, images: [], text: "", time: "" },
      };
    }

    default:
      return state;
  }
};
