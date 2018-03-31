import { TOGGLE_VALUE, Actions, AUTO_PENCIL } from "../actions/actions";
import { Board } from "../lib/sudopeku";

export type BoardState = {
    readonly board: Board,
};

export const initialState: BoardState = {
    board: Board.createEmpty(),
};

export function boardReducer(state: BoardState = initialState, action: Actions[typeof TOGGLE_VALUE | typeof AUTO_PENCIL]): BoardState {
    switch (action.type) {
        case TOGGLE_VALUE:
            const { row, col, selectionerState } = action.payload;
            return {
                ...state,
                board: state.board.toggleValueByCell(row, col, selectionerState),
            };

        case AUTO_PENCIL:
            return {
                ...state,
                board: state.board.autoPencil(),
            };
    }
    return state;
}