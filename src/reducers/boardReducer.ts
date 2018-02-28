import { TOGGLE_NUMBER } from '../actions/actions';
import { Board } from '../lib/sudopeku';

export type BoardState = {
    readonly board: Board,
}

export const initialState: BoardState = {
    board: new Board(),
};

export function boardReducer(state: BoardState = initialState, action) {
    switch (action.type) {
        case TOGGLE_NUMBER:
        const { row, col, number } = action.payload;
        return {
            board: state.board.toggleNumberByCell(row, col, number),
        };
    }
    return state;
}