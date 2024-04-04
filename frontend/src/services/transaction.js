import { POST, GET, PUT, DELETE} from "../utils/http";

export function CREATE_TRANSACTIONS(params) {
  return POST(`/transaction/createTransactions`, params);
}

export function GET_TRANSACTIONS(params) {
  return GET(`/transaction/getTransactions`, params);
}

export function UPDATE_TRANSACTIONS(params) {
  return PUT(`/transaction/updateTransactions`, params);
}

export function DELETE_TRANSACTIONS(params) {
  return DELETE(`/transaction/deleteTransactions`, params);
}

