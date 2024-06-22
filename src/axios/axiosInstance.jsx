import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://current-wave-server.vercel.app"
});

// Add a request interceptor to include the token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
