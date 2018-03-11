import {combineReducers} from "redux";
import { BoardState, boardReducer } from "./boardReducer";
import { selectionerReducer } from "./selectionReducer";
import { SelectionerState } from "../lib/sudopeku";

export type RootState = {
    board: BoardState;
    selectioner: SelectionerState,
};

export default combineReducers<RootState>({
    board: boardReducer,
    selectioner: selectionerReducer,
});