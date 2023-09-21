import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const baseURL: string = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: `${baseURL}/api`,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;

      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (e) {
      // console.log(e);
    }

    throw error;
  }
);

export default axiosClient;
