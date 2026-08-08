import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL;

const API_URL =
  `${BASE_URL}/api/auth`;

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

function getAuthConfig() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/me`, getAuthConfig());
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axios.delete(`${API_URL}/me`, getAuthConfig());
  return response.data;
};