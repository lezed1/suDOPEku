import * as React from "react";
import * as Immutable from "immutable";
import "./../assets/scss/App.scss";
import { Board, Cell } from "../lib/sudopeku";
import BoardGrid from "./BoardGrid";
import Selectioner from "./Selectioner";

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
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
