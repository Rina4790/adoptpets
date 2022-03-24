import { petsFetch } from "./helpers";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch("https://api.adoptpets.click/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const result = await response.json();

  if (response.ok === false) {
    throw result;
  }

  return result;
};

export const loginUser = async (username: string, password: string) => {
  const response = await fetch("https://api.adoptpets.click/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (response.ok === false) {
    throw result;
  }

  return result;
};

export const getProfile = async () => {
  const response = await petsFetch("https://api.adoptpets.click/users/me");

  if (response.ok) {
    const result = await response.json();

    return result;
  }
};
