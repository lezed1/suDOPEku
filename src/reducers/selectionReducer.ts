import { SELECT_VALUE, Actions } from "../actions/actions";
import { Board } from "../lib/sudopeku";

export type SelectionState = {
    readonly selectedValue: number,
};

export const initialState: SelectionState = {
    selectedValue: -1,
};

export function selectionerReducer(state: SelectionState = initialState, action: Actions[typeof SELECT_VALUE]): SelectionState {
    switch (action.type) {
        case SELECT_VALUE:
            if (state.selectedValue === action.payload.selectedValue) {
                return { selectedValue: -1 };
            }
            return { selectedValue: action.payload.selectedValue };
    }
    return state;
}