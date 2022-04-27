import { ACTIONS } from "../constants";

export interface IUserState {
	
	 user: {
		 username: string;
		 email: string;
		 country: string;
		 state: string;
		city: string;
		address: string;
		 phone: string;
		 pets: [
			 {
				 name: string;
	description: string;
	sex: string;
	species: string;
	birth_date: string;
	image: string;
	has_home: boolean;
	id: number;
			 }
		 ]
	 }
 }
 
 
 const defaultState: IUserState = {
	
	 user: {
		 
			 username: "",
			 email: "",
			 country: "",
			 state: "",
			city: "",
			address: "",
			 phone: "",
			 pets: [
				 {
					 name: "",
		description: "",
		sex: "",
		species: "",
		birth_date: "",
		image: "",
		has_home: false,
		id: 0,
				 }
			 ]
		 }
	
 };
 
 export const userReducer = (state = defaultState, action: any) => {
	
	if (action.type === ACTIONS.ADD_USER) {
	  return {
		 ...state, user: action.user
		 
		 
		 
		 
		 
	  };
	}
 
	return state;
 };
 
 