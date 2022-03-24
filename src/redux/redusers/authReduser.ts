import { ACTIONS } from "../constants";

export interface IAuthState {
  error: any;
  username: string;
  email: string;
  id: number;
  isLoggedIn: boolean;
}

const defaultState: IAuthState = {
  error: null,
  username: "",
  email: "",
  id: 0,
  isLoggedIn: false,
};

export const authReducer = (state = defaultState, action: any) => {
  if (action.type === ACTIONS.REGISTER_FAILURE) {
    return { ...state, error: action.error };
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
    };
  }

  return state;
};


 