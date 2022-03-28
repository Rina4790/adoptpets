import { petsFetch } from "./helpers";

// export const LIMIT = 5;

export const getPosts = async () => {
  const response = await petsFetch(
    `https://api2.adoptpets.click/posts`
  );

  const result = await response.json();

  return result;
};
