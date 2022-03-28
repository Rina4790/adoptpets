import { Dispatch } from "redux";

import { getPets } from "../../services/pets";
import { ACTIONS } from "../constants";
import { IPet } from "../redusers/petsReduser";
import { IState } from "../store";

export const addPets = (pets: IPet[], count: number) => {
  return {
    type: ACTIONS.ADD_PETS,
    pets: pets,
    count,
  };
};

export const fetchPets = () => {
  return async (dispatch: Dispatch, getState: () => IState) => {
    const {
      petsReducer: {},
    } = getState();

    {
      const result = await getPets();

      dispatch(addPets(result.pets, result.count));
    }
  };
};

export const addPet = (pet: IPet) => {
  return {
    type: ACTIONS.ADD_PET,
    pet: pet,
  };
};



export const fetchPet = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch("https://api2.adoptpets.click/pets/" + id);
    const pet = await response.json();

    dispatch(addPet(pet));
  };
};



export const deletePet = () => {
  return { type: ACTIONS.DELETE_PET };
};

export const searchPets = (search: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(``);

    const result = await response.json();

    dispatch(addPets(result.pets, result.count));
  };
};
