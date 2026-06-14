export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token
    }
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return res;
};