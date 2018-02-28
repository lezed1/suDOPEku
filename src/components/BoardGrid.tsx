import * as React from "react";
import "./../assets/scss/BoardGrid.scss";
import { Board } from "../lib/sudopeku";


export interface BoardProps {
    board: Board;
}

export default class BoardGrid extends React.Component<BoardProps, undefined> {
    render() {
        return (
            <div className="board">
                <div className="boardRows">
                    {
                        this.props.board.board.map((row, idx) =>
                            <div className="boardColumns" key={idx}>
                                {
                                    row.map((value, idx) =>
                                        <div className="cell" key={idx}>
                                            <div className="value">
                                                {value}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
