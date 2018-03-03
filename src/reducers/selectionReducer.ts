import { SELECT_NUMBER, Actions } from "../actions/actions";
import { Board } from "../lib/sudopeku";

export type SelectionState = {
    readonly selectedNumber: number,
};

export const initialState: SelectionState = {
    selectedNumber: 1,
};

export function selectionerReducer(state: SelectionState = initialState, action: Actions[typeof SELECT_NUMBER]): SelectionState {
    switch (action.type) {
        case SELECT_NUMBER:
            return { selectedNumber: action.payload.selectedNumber };
    }
    return state;
}