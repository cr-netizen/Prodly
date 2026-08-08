import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/products`;
const AI_URL = `${BASE_URL}/api/ai/generate-description`;

function getAuthConfig() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const getProducts = async () => {
  const response = await axios.get(API_URL, getAuthConfig());
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product, getAuthConfig());
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    getAuthConfig()
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};

export const generateDescription = async (product) => {
  const response = await axios.post(AI_URL, product, getAuthConfig());
  return response.data;
};
