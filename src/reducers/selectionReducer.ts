import { SELECT_VALUE, Actions, TOGGLE_PENCIL } from "../actions/actions";
import { Board, SelectionerState } from "../lib/sudopeku";

export const initialState: SelectionerState = {
    selectedValue: -1,
    isPencil: false,
};

export function selectionerReducer(state: SelectionerState = initialState, action: Actions[typeof SELECT_VALUE | typeof TOGGLE_PENCIL]): SelectionerState {
    switch (action.type) {
        case SELECT_VALUE:
            if (state.selectedValue === action.payload.selectedValue) {
                return { ...state, selectedValue: -1 };
            }
            return { ...state, selectedValue: action.payload.selectedValue };
        case TOGGLE_PENCIL:
            return { ...state, isPencil: !state.isPencil };
    }
    return state;
}