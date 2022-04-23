import { ACTIONS } from "../constants";
export interface IHomeState {
  id: string;
}
const defaultState: IHomeState = {
  id: "",
};


export const homeReducer = (state = defaultState, action:any) => {
	switch (action.type) {
		case ACTIONS.ADD_HOME: {
			return {
				...state,
			
				id: action.id,
			}
	}
		 
	  case 'DELETE_HOME':
		return {
			...state,
			
			  id: "",
			}
		 
	  default:
		 return state
	}
 }
 

