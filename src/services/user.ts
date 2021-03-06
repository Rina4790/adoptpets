import { petsFetch } from "./helpers";

export const getUser = async () => {
  const response = await petsFetch(`https://api2.adoptpets.click/users/me`);
  const result = await response.json();
  return result;
};

export const getUserId = async () => {
	const response = await petsFetch(`https://api2.adoptpets.click/users/`);
	const result = await response.json();
	return result;
 };

