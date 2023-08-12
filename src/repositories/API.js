import axios from "axios";
import { API_URL } from "#/config/constants.js";
import { startLoading, stopLoading } from "#/hooks/UIState.js";
import { removeKey } from "#/utils/localStorageHelper.js";

const API = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

//* Set the interceptors
API.interceptors.request.use((config) => {
  if (config?.secure) {
    const token = localStorage.getItem("token") || "";
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
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { status } = error?.response;
    if(status === 401){
      removeKey("token")
      removeKey("refreshToken")
    }
  },
);

export default API;
