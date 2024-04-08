import { POST, GET, PUT, DELETE } from "../utils/http";

export function CREATE_TRANSACTIONS(params) {
  return POST(`/transaction`, params);
}

export function GET_TRANSACTIONS(params) {
  return GET(`/transaction/${params.id}`);
}

export function UPDATE_TRANSACTIONS(params) {
  return PUT(`/transaction/${params.id}`, params);
}

export function DELETE_TRANSACTIONS(params) {
  return DELETE(`/transaction/${params.id}`, params);
}
