import { TOGGLE_VALUE, Actions } from "../actions/actions";
import { Board } from "../lib/sudopeku";

export type BoardState = {
    readonly board: Board,
};

export const initialState: BoardState = {
    board: Board.createEmpty(),
};

export function boardReducer(state: BoardState = initialState, action: Actions[typeof TOGGLE_VALUE]): BoardState {
    switch (action.type) {
        case TOGGLE_VALUE:
        const { row, col, selectionerState } = action.payload;
        return {
            board: state.board.toggleValueByCell(row, col, selectionerState),
        };
    }
    return state;
}