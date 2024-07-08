import axios from "axios";
import { GEOCODING_URL,GEOCODING_API_KEY } from "#/config/constants.js";

const GEOCODING = axios.create({
  baseURL: GEOCODING_URL,
  timeout: 60000,
});

//* request interceptor add key at the end of url
GEOCODING.interceptors.request.use(
  async (config) => {
    config.url += `&key=${GEOCODING_API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default GEOCODING;
