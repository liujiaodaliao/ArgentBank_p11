import { GET } from "../utils/http";

export function GET_ACCOUNTS(params) {
  return GET("/account/getAccount", params);
}

