// axios用于后端请求的库 [https://axios-http.com/docs/intro]
import axios from "axios";
import { BASE_URL } from "../config";
import { WHITE_LIST } from "../config/index";

// 初始化一个axios实例
const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: BASE_URL,
});

// 请求拦截器 (校验token的)
// instance.interceptors.request.use((config) => {
//   const currentRoutePath = location.pathname;
//   console.log(WHITE_LIST.includes(currentRoutePath), "--是否白名单页面");
//   if (WHITE_LIST.includes(currentRoutePath)) {
//     debugger;
//     return config;
//   }

//   // 如果没有token的就需要返回到登录页（登录、注册）
//   const token = localStorage.getItem("token");
//   debugger;
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//     debugger;
//     return config;
//   } else {
//     return (window.location.href = "/sign");
//   }
// });

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

// class Person {
//   constructor(name, sex) {
//     this.name = name;
//     this.sex = sex;
//   }
//   eat() {
//     console.log("eat");
//   }
// }

// const person = new Person("John", "male");
