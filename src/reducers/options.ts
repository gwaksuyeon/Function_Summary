import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';

// action types
export const OPTION_CREATE = 'options/OPTION_CREATE';
export const OPTION_DELETE = 'options/OPTION_DELETE';
export const AMOUNT_PLUS = 'options/AMOUNT_PLUS';
export const AMOUNT_MINUS = 'options/AMOUNT_MINUS';
export const OPTION_RESET = 'options/OPTION_RESET';

// actions
export const optionCreate = createAction(OPTION_CREATE)<any>();
export const optionDelete = createAction(OPTION_DELETE)<any>();
export const amountPlus = createAction(AMOUNT_PLUS)<any>();
export const amountMinus = createAction(AMOUNT_MINUS)<any>();
export const optionReset = createAction(OPTION_RESET)();

const actions = {
    optionCreate,
    optionDelete,
    amountPlus,
    amountMinus,
    optionReset,
};

type Actions = ActionType<typeof actions>;

interface State {
    combineOptionList: any[];
    separationOptionList: any[];
    noOptionList: any[];
}

// default state
const initialState: State = {
    combineOptionList: [],
    separationOptionList: [],
    noOptionList: [],
};

const Reducer = createReducer<State, Actions>(initialState, {
    [OPTION_CREATE]: (state, action) =>
        produce(state, (draft) => {
            const { type, selectedList } = action.payload;

            if (type === 'combine') {
                const findIndex = state.combineOptionList.findIndex(
                    (f: any) => f.selected2.no === selectedList.selected2.no,
                );

                if (findIndex === -1) {
                    draft.combineOptionList =
                        state.combineOptionList.concat(selectedList);
                } else {
                    draft.combineOptionList[findIndex].buyCnt =
                        state.combineOptionList[findIndex].buyCnt + 1;
                }
            }

            if (type === 'separation') {
                const findIndex = state.separationOptionList.findIndex(
                    (f: any) =>
                        f.selected1.no === selectedList.selected1.no &&
                        f.selected2.no === selectedList.selected2.no,
                );

                if (findIndex === -1) {
                    draft.separationOptionList =
                        state.separationOptionList.concat(selectedList);
                } else {
                    draft.separationOptionList[findIndex].buyCnt =
                        state.separationOptionList[findIndex].buyCnt + 1;
                }
            }

            if (type === 'noOption') {
                draft.noOptionList = [selectedList];
            }
        }),

    [OPTION_DELETE]: (state, action) =>
        produce(state, (draft) => {
            const { type, index } = action.payload;

            if (type === 'combine') {
                draft.combineOptionList = state.combineOptionList.filter(
                    (f: any, inx: number) => inx !== index,
                );
            }

            if (type === 'separation') {
                draft.separationOptionList = state.separationOptionList.filter(
                    (f: any, inx: number) => inx !== index,
                );
            }
        }),

    [AMOUNT_PLUS]: (state, action) =>
        produce(state, (draft) => {
            const { type, index } = action.payload;

            if (type === 'combine') {
                draft.combineOptionList[index].buyCnt =
                    state.combineOptionList[index].buyCnt + 1;
            }

            if (type === 'separation') {
                draft.separationOptionList[index].buyCnt =
                    state.separationOptionList[index].buyCnt + 1;
            }

            if (type === 'noOption') {
                draft.noOptionList[0].buyCnt = state.noOptionList[0].buyCnt + 1;
            }
        }),

    [AMOUNT_MINUS]: (state, action) =>
        produce(state, (draft) => {
            const { type, index } = action.payload;

            if (type === 'combine') {
                draft.combineOptionList[index].buyCnt =
                    state.combineOptionList[index].buyCnt - 1 < 1
                        ? 1
                        : state.combineOptionList[index].buyCnt - 1;
            }

            if (type === 'separation') {
                draft.separationOptionList[index].buyCnt =
                    state.separationOptionList[index].buyCnt - 1 < 1
                        ? 1
                        : state.separationOptionList[index].buyCnt - 1;
            }

            if (type === 'noOption') {
                draft.noOptionList[0].buyCnt =
                    state.noOptionList[0].buyCnt - 1 < 1
                        ? 1
                        : state.noOptionList[0].buyCnt - 1;
            }
        }),

    [OPTION_RESET]: (state, action) =>
        produce(state, (draft) => {
            draft.combineOptionList = [];
            draft.separationOptionList = [];
            draft.noOptionList = [];
        }),
});

export default Reducer;
