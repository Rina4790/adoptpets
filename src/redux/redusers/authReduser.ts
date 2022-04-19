import { ACTIONS } from "../constants";

export interface IAuthState {
  error: any;
  username: string;
  email: string;
  id: number;
  isLoggedIn: boolean;
	country: string;
	states: string;
  city: string;
  address: string;
	phone: string;
	
}


const defaultState: IAuthState = {
  error: null,
  username: "",
  email: "",
  id: 0,
  isLoggedIn: false,
	country: "",
  states: "",
  city: "",
  address: "",
	phone: "",
	
  
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
      city: action.city,
      address: action.address,
      phone: action.phone,
    };
  }

  return state;
};

