import { Dispatch } from "redux";
import { petsFetch } from "../../services/helpers";

import { getPets } from "../../services/pets";
import { ACTIONS } from "../constants";
import { IHomeState } from "../redusers/homeReduser";
import { IState } from "../store";

export const addHome = (id: string) => ({
	type: ACTIONS.ADD_PET,
	id
})
 

 
 export const deleteHome = (id: string) => ({
	type: 'DELETE_HOME',
	id
 })
 

 

// export const addHome = ( id: IHomeState) => {
// 	return {
// 	  type: ACTIONS.ADD_PET,
// 	  id: id,
// 	};
// };

// export const petHome = (id: number) => {
// 	return  (dispatch: Dispatch) => {
	  
// 	  const home = id.toString();
// 	  dispatch(addHome(home));
// 	};
// };
 
// export const fetchHome = (id: string) => {
// 	return async (dispatch: Dispatch) => {
// 	  const response = await petsFetch("https://api2.adoptpets.click/pets/" + id);
// 	  const home = await response.json();
// 	  dispatch(addHome(home));
// 	};
// };
 
// export const deleteHome = () => {
// 	return { type: ACTIONS.DELETE_HOME };
//  };