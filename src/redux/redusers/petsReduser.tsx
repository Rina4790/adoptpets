import { ACTIONS } from "../constants";

export interface IPet {
  name: string;
  description: string;
  sex: string;
  species: string;
  birth_date: string;
  image: string;
  has_home: boolean;
  id: number;
	owner_id: number;
	country: string;
	city: string;
}

export interface IPetsState {
  pets: IPet[];
  pet: IPet;
  count: number;
}

const defaultState: IPetsState = {
  pets: [],
  pet: {
    name: "",
    description: "",
    sex: "",
    species: "",
    birth_date: "",
    image: "",
    has_home: false,
    id: 0,
	  owner_id: 0,
	  country: "",
	  city: "",
  },
  count: 0,
};

export const petsReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ACTIONS.ADD_PETS: {
      return {
        ...state,
        pets: action.pets,
        count: action.count,
      };
    }

    case ACTIONS.ADD_PET: {
      return { ...state, pet: action.pet };
    }

    case ACTIONS.DELETE_PET: {
      return {
        ...state,
        pet: {
          name: "",
          description: "",
          sex: "",
          species: "",
          birth_date: "",
          image: "",
          has_home: false,
          id: 0,
          owner_id: 0,
        },
      };
    }

    default:
      return state;
  }
};
