import axios from "axios";
import { IPAPI_URL } from "#/config/constants.js";
import { startLoading, stopLoading } from "#/stores/UIState.js";
import { findKey, removeKey } from "#/utils/localStorageHelper.js";

const IPAPI = axios.create({
  baseURL: IPAPI_URL,
  timeout: 60000,
});

export default IPAPI;
