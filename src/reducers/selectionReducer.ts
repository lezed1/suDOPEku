import { TOGGLE_NUMBER } from '../actions/actions';
import { Board } from '../lib/sudopeku';

export type SelectionState = {
    readonly selectedNumber: number,
}

export const initialState: SelectionState = {
    selectedNumber: 1,
};

export function selectionReducer(state: SelectionState = initialState, action) {
    // TODO: Make numbers selectable
    return state;
}