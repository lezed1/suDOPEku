import * as React from "react";
import * as Immutable from "immutable";
import "./../assets/scss/App.scss";
import { Board, Cell } from "../lib/sudopeku";
import BoardGrid from "./BoardGrid"

export interface AppProps {
}

interface AppState {
    board: Board;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = { board: new Board() };
    }

    makeClickHandler = (row_idx: number, col_idx: number): () => void => {
        return () => {
            let board = this.state.board;

            this.setState({ board: board.toggleNumberByCell(row_idx, col_idx, 1)});
        }
    }

    render() {
        return (
            <div className="app">
                <BoardGrid board={this.state.board} makeClickHandler={this.makeClickHandler} />
            </div>
        );
    }
}
