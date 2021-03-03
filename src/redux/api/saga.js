import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { apiActions } from "./reducer";
import {  getApiResult} from "../services/api-sause";

export function* getApiAllData() {
  try {
    const response = yield call(getApiResult);
    yield put(apiActions.Creators.apiSuccess(response));
  } catch (error) {
    yield put(apiActions.Creators.apiFailure(error));
  }
}

export function* watchGetAllApi() {
  yield takeEvery(apiActions.Types.GET_API_DATA, getApiAllData);
}

export default function* rootSaga() {
  yield all([fork(watchGetAllApi)]);
}
