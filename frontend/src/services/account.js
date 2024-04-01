import { POST, GET } from "../utils/http";

export function GET_ACCOUNTS(params) {
  return GET("/account/getAccount", params);
}

export function GET_ACCOUNT_DETAIL(params) {
  return GET("/account/getAcountDetail", params);
}
