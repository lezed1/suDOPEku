import * as React from "react";
import * as Immutable from "immutable";
import "./../assets/scss/App.scss";
import { Board, Cell } from "../lib/sudopeku";
import BoardGrid from "./BoardGrid";
import Selectioner from "./Selectioner";

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    // makeClickHandler = (row_idx: number, col_idx: number): () => void => {
    //     return () => {
    //         let board = this.state.board;

    //         this.setState({ board: board.toggleNumberByCell(row_idx, col_idx, 1)});
    //     }
    // }

    render() {
        return (
            <div className="app">
                <div className="boardGridContainer" >
                    <BoardGrid />
                </div>
                <div className="selectionerContainer" >
                    <Selectioner />
                </div>
            </div>
        );
    }
}
