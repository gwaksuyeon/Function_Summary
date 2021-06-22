import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';

// action types
export const OPTION_CREATE = 'options/OPTION_CREATE';

// actions
export const optionCreate = createAction(OPTION_CREATE)<any>();

const actions = {
    optionCreate,
};

type Actions = ActionType<typeof actions>;

interface State {
    combineOptionList: any[];
    separationOptionList: any[];
}

// default state
const initialState: State = {
    combineOptionList: [],
    separationOptionList: [],
};

const Reducer = createReducer<State, Actions>(initialState, {
    [OPTION_CREATE]: (state, action) =>
        produce(state, (draft) => {
            const { type, selectList } = action.payload;

            if (type === 'combine') {
                draft.combineOptionList =
                    state.combineOptionList.concat(selectList);
            }

            if (type === 'separation') {
                draft.separationOptionList =
                    state.separationOptionList.concat(selectList);
            }
        }),
});

export default Reducer;
