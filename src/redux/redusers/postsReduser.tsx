import { ACTIONS } from "../constants";

export interface IPost {
  id: string;
  owner_id: number;
  images: string[];
  text: string;
  time: Date;
  avatar: string;
  name: string;
  comments: [
    {
      text: string;
      id: string;
      time: Date;
      owner_id: string;
      post_id: string;
      username: string;
    }
  ];
  comments_count: number;
}

export interface IPostsState {
  posts: IPost[];
  post: IPost;
  count: number;
}

const defaultState: IPostsState = {
  posts: [],
  post: {
    id: "",
    owner_id: 0,
    images: [""],
    text: "",
    time: new Date(),
    avatar: "",
    name: "",
    comments: [
      {
        text: "",
        id: "",
        time: new Date(),
        owner_id: "",
        post_id: "",
        username: "",
      },
    ],
    comments_count: 0,
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
      };
    }

    case ACTIONS.ADD_POST: {
      return { ...state, post: action.post };
    }

    case ACTIONS.DELETE_POST: {
      return {
        ...state,
        post: {
          id: 0,
          owner_id: 0,
          images: [],
          text: "",
          time: "",
          avatar: "",
          name: "",
        },
      };
    }

    default:
      return state;
  }
};
