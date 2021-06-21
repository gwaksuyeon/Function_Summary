import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension'

import Reducers from 'reducers';
import { rootSaga } from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga);

export default store;
