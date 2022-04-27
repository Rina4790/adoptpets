import { ACTIONS } from "../constants";

export interface IAuthState {
  error: any;
  username: string;
  email: string;
  id: number;
  isLoggedIn: boolean;
	country: string;
	state: string;
  city: string;
  address: string;
	phone: string;
	petInHome: number;
}


const defaultState: IAuthState = {
  error: null,
  username: "",
  email: "",
  id: 0,
  isLoggedIn: false,
	country: "",
  state: "",
  city: "",
  address: "",
	phone: "",
	petInHome: 0,
  
};

export const authReducer = (state = defaultState, action: any) => {
  if (action.type === ACTIONS.REGISTER_FAILURE) {
    return { ...state, error: action.error };
  }

  if (action.type === ACTIONS.LOGOUT) {
    state = defaultState;
    return {
      undefined,
    };
  }
  if (action.type === ACTIONS.REGISTER_SUCCESS) {
    return {
      ...state,
      error: null,
      username: action.username,
      email: action.email,
      id: action.id,
    };
  }

  if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...state,
      error: null,
      username: action.username,
      email: action.email,
      id: action.id,
      isLoggedIn: true,
		 country: action.country,
		state: action.state,
      city: action.city,
      address: action.address,
		 phone: action.phone,
		 petInHome: action.petInHome,
    };
  }
	
  if (action.type === ACTIONS.ADD_HOME) {
	return {
	  ...state,
	  error: null,
	  petInHome: action.petInHome,
	};
 }

  return state;
};

