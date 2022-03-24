import { petsFetch } from "./helpers";



export const getPets = async () => {
  const response = await petsFetch(
    `https://api.adoptpets.click/users/me`
  );

  const result = await response.json();

  return result;
};
