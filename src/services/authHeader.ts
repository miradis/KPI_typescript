import axios from "axios";
import Cookies from "js-cookie";
const API_URL="https://kpi-production.up.railway.app/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const sessionData = Cookies.get("session");
  const token = sessionData ? JSON.parse(sessionData).accessToken : null;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Cache-Control"] = "no-cache";
  config.headers['Content-Type']="application/pdf"

  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized access
      Cookies.remove("session")
      window.location.href = "/"; // Redirect to the login page
    }
    else if (error.response && error.response.status === 403) {
      // Access forbidden
      // Cookies.remove("token");
      // Cookies.remove("user");
      window.location.href = "/unauthorized"; // Redirect to the unauthorized page
    }
    return Promise.reject(error);
  }
);


export {axiosInstance}