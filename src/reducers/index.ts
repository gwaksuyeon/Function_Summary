import { combineReducers } from 'redux';
import test from './test';
import options from './options';

const rootReducer = combineReducers({
    test,
    options,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
