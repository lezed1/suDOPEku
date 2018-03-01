import {combineReducers} from 'redux';
import { BoardState, boardReducer } from './boardReducer';
import { SelectionState, selectionerReducer } from './selectionReducer';

export type RootState = {
    board: BoardState;
    selection: SelectionState,
}

export default combineReducers<RootState>({
    board: boardReducer,
    selection: selectionerReducer,
});