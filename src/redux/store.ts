import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { IPostsState, postsReducer } from "./redusers/postsReduser";
import { IAuthState, authReducer } from "./redusers/authReduser";
import { IPetsState, petsReducer } from "./redusers/petsReduser";
import { IUserState, userReducer } from "./redusers/userReduser";
import { IHomeState, homeReducer } from "./redusers/homeReduser"
export interface IState {
	petsReducer: IPetsState;
	authReducer: IAuthState;
	postsReducer: IPostsState;
	userReducer: IUserState;
	homeReducer: IHomeState;
}

export const store = createStore(
  combineReducers({ petsReducer, authReducer, postsReducer, userReducer, homeReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
