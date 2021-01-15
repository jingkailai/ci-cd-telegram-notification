import axios from "axios";
export const apiUrl = "http://localhost:4000";


const baseUrl = axios.create({ baseURL: apiUrl });

const errHandling = (error) => Promise.reject(error);

const reqHandling = (config) => {
  const obj = { ...config };
  const token = localStorage.getItem("token");
  if (token) obj.headers["authorization"] = `Bearer ${token}`;
  return obj;
};

const resHandling = (response) => response;

baseUrl.interceptors.request.use(reqHandling, errHandling);
baseUrl.interceptors.response.use(resHandling, errHandling);


export { baseUrl };
