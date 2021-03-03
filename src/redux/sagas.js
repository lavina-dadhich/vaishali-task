import apiSagas from "./api/saga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([apiSagas()]);
}
