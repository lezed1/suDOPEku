import * as React from "react";
import "./../assets/scss/BoardGrid.scss";
import { Board, Cell, Location } from "../lib/sudopeku";


export interface BoardProps {
    board: Board;
    makeClickHandler(row_idx: number, col_idx: number): () => void;
}

export default class BoardGrid extends React.Component<BoardProps, undefined> {
    createGrid() {
        const size = this.props.board.size;
        const rows = [];
        for (let row = 1; row <= size; row++) {
            const cols = [];
            for (let col = 1; col <= size; col++) {
                const cellComponent = this.props.board.board.get(new Location(row, col)).getComponent();
                cols.push(
                    <div className="cell" onClick={this.props.makeClickHandler(row, col)} key={col}>
                        <div className="cellContents" >
                            {cellComponent}
                        </div>
                    </div>)
                    ;
            }
            rows.push(<div className="boardColumns" key={row}>{cols}</div>);
        }
        return (<div className="boardRows">{rows}</div>);
    }

    render() {
        return (
            <div className="board">
                {
                    this.createGrid()
                }
            </div>
        );
    }
}
