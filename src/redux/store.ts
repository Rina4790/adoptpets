import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { IPostsState, postsReducer } from "./redusers/postsReduser";
import { IAuthState, authReducer } from "./redusers/authReduser";
import { IPetsState, petsReducer } from "./redusers/petsReduser";
import { IUserState, userReducer } from "./redusers/userReduser";

export interface IState {
	petsReducer: IPetsState;
	authReducer: IAuthState;
	postsReducer: IPostsState;
	userReducer: IUserState;
}

export const store = createStore(
  combineReducers({ petsReducer, authReducer, postsReducer, userReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
