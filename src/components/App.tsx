import * as React from "react";
import "./../assets/scss/App.scss";
import { Board } from "../lib/sudopeku";
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

    render() {
        return (
            <div className="app">
                <BoardGrid board={this.state.board} />
            </div>
        );
    }
}
