import axios from "axios";
import { API_URL } from "#/config/constants.js";
import {startLoading, stopLoading} from "#/hooks/UIState.js";

const API = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

//* Set the interceptors
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //* If config?.await is true, then the request will be awaited
  if (config?.await) {
    startLoading();
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    const { config } = response;
    if (config?.await) {
      stopLoading();
    }
    return response?.data;
  },
  (error) => {
    console.log(error);
  }
);

export default API;
