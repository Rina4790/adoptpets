import { Dispatch } from "redux";

import { getPets } from "../../services/pets";
import { ACTIONS } from "../constants";
import { IUserState } from "../redusers/userReduser";
import { IState } from "../store";

export const addUser = (user: IUserState) => {
	return {
	  type: ACTIONS.ADD_USER,
	  user: user,
	};
 };

export const userId = (id: string) => {
	return async (dispatch: Dispatch, ) => {
		const response = await fetch("https://api2.adoptpets.click/users/" + id);
	  
		const user = await response.json();
		 dispatch(addUser(user));
	  
	};
 };