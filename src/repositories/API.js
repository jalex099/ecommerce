import axios from "axios";
import { API_URL } from "#/config/constants.js";
import { startLoading, stopLoading } from "#/stores/UIState.js";
import { findKey, removeKey } from "#/utils/localStorageHelper.js";

const API = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

//* Set the interceptors
API.interceptors.request.use((config) => {
  if (config?.secure) {
    const token = findKey("token");
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
    if (error.config?.background !== true) stopLoading();

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      removeKey("token");
      removeKey("refreshToken");
    }
    return Promise.reject(error);
  }
);

export default API;
