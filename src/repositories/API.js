import axios from "axios";
import { API_URL } from "#/config/constants.js";
import { startLoading, stopLoading } from "#/stores/UIState.js";
import { findKey, removeKey } from "#/utils/localStorageHelper.js";
import { refreshToken } from "#/services/AuthService.js";


const API = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

//* Set the interceptors
API.interceptors.request.use((config) => {
  if (config?.secure) {
    const token = findKey("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (originalRequest?.background !== true) stopLoading();

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const newToken = findKey("token");
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (err) {
        removeKey("token");
        removeKey("refreshToken");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
