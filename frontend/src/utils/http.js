// axios用于后端请求的库 [https://axios-http.com/docs/intro]
import axios from "axios";
import { BASE_URL } from "../config";

// 初始化一个axios实例
const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}` || "";
  return config;
});

// 响应拦截器 (统一处理错误码信息，把最需要的响应体抛出去)
instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status === 200) {
      const { status: innerStatus, message, body } = data;
      if (innerStatus === 200) {
        return body;
      }
      return Promise.reject(message);
    }
  },
  (err) => {
    return Promise.reject(err.response.data.message);
  }
);

export const POST = (url, data, config) => {
  return instance.post(url, data, config);
};

export const PUT = (url, data, config) => {
  return instance.put(url, data, config);
};

export const GET = (url, params) => {
  return instance.get(url, { params });
};

export const DELETE = (url, params) => {
  return instance.delete(url, { params });
};
