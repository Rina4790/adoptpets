import { Dispatch } from "redux";
import { getProfile, loginUser, registerUser } from "../../services/auth";
import { getUser } from "../../services/user";
import { ACTIONS } from "../constants";
import { IState } from "../store";
import { IAuthState } from "../redusers/authReduser";
interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export const userData = () => {
  return async (dispatch: Dispatch, getState: () => IState) => {
    const {
      petsReducer: {},
    } = getState();
    {
      const result = await getUser();
      dispatch(getUserData(result));
    }
  };
};

const getUserData = (profile: IProfile) => {
  return {
    type: ACTIONS.GET_USER_DATA,
    ...profile,
  };
};

const getPedId = (petInHome: IAuthState) => {
	return {
	  type: ACTIONS.ADD_HOME,
	  petInHome: petInHome,
	};
 };
 
 export const addPetInHome = (petInHome: number) => {
	return {
		 type: ACTIONS.ADD_HOME,
		 petInHome,
	};
};



export const register = ({ username, email, password }: IRegisterData) => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await registerUser(username, email, password);
      dispatch(registerSuccess(result));
    } catch (error: any) {
      dispatch(registerFailure(error));
    }
  };
};

const registerFailure = (error: any) => {
  return {
    type: ACTIONS.REGISTER_FAILURE,
    error: error,
  };
};

interface IProfile {
  email: string;
  username: string;
  id: number;
  country: string;
  city: string;
  address: string;
  phone: string;
}



const registerSuccess = (profile: IProfile) => {
  return {
    type: ACTIONS.REGISTER_SUCCESS,
    ...profile,
  };
};

const loginSuccess = (profile: IProfile) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    ...profile,
  };
};

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const { access, refresh } = await loginUser(username, password);
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("username", username);
      const profile = await getProfile();
      dispatch(loginSuccess(profile));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };
};

export const init = () => {
  return async (dispatch: Dispatch) => {
    try {
      const access = localStorage.getItem("access");

      if (access) {
        const profile = await getProfile();
        if (profile) {
          dispatch(loginSuccess(profile));
        }
      }
    } catch (error) {}
  };
};
