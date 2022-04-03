export const petsFetch = async (url: string, config?: RequestInit) => {
  const access = localStorage.getItem("access");

  const response = await fetch(url, {
    ...config,

    headers: access
      ? {
          ...config?.headers,
          Authorization: `Bearer ${access}`,
        }
      : config?.headers,
  });

  if (response.ok === false) {
    const error = await response.json();
    const isExpired = error.detail.includes("expired");

    if (isExpired) {
      const refresh = localStorage.getItem("refresh");

      const responseToken = await fetch(
        "https://api2.adoptpets.click/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refresh}`,
          },
          body: "",
        }
      );

      if (responseToken.ok) {
        const result = await responseToken.json();

        localStorage.setItem("access", result.access);

        const refreshedResponse = await fetch(url, {
          ...config,
          headers: {
            Authorization: `Bearer ${result.access}`,
            ...config?.headers,
          },
        });

        return refreshedResponse;
      }
    }
  }

  return response;
};
