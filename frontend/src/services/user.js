import { POST, PUT } from "../utils/http";

export function LOGIN(params) {
  return POST("/user/login", params);
}

export function SIGN_UP(params) {
  return POST("/user/signup", params);
}

export function GET_PROFILE(params) {
  return POST("/user/profile", params);
}

export function UPDATE_PROFILE(params) {
  return PUT("/user/profile", params);
}
