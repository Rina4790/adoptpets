import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { IPostsState, postsReducer } from "./redusers/postsReduser";
import { IAuthState, authReducer } from "./redusers/authReduser";
import { IPetsState, petsReducer } from "./redusers/petsReduser";

export interface IState {
	petsReducer: IPetsState;
	authReducer: IAuthState;
	postsReducer: IPostsState;
}

export const store = createStore(
  combineReducers({ petsReducer, authReducer, postsReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
