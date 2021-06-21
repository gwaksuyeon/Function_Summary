import {takeEvery, put} from 'redux-saga/effects'
import { TEST, TEST_SUCCESS } from 'reducers/test';

function* test(action: any) {
  yield put({ type: TEST_SUCCESS, payload: action.payload});
}

export function* watchTest() {
  yield takeEvery(TEST, test);
}