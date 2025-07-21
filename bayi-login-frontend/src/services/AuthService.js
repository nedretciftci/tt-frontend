import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  return axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
};

export const logout = async () => {
  return axios.post(`${API_URL}/api/auth/logout`);
};
