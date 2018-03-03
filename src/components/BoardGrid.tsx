import * as React from "react";
import "./../assets/scss/BoardGrid.scss";
import { Board, Cell, Location } from "../lib/sudopeku";
import { connect } from "react-redux";
import { BoardState } from "../reducers/boardReducer";
import { bindActionCreators, Dispatch } from "redux";
import { actions, TToggleNumberPayload } from "../actions/actions";
import { RootState } from "../reducers/rootReducer";


export interface BoardProps {
    board: Board;
    selectedNumber: number;
    toggleNumber(payload: TToggleNumberPayload): () => void;
}

class BoardGrid extends React.Component<BoardProps, undefined> {
    createGrid() {
        const size = this.props.board.size;
        const cells = [];
        for (let row = 1; row <= size; row++) {
            for (let col = 1; col <= size; col++) {
                const cellComponent = this.props.board.board.get(new Location(row, col)).getComponent();
                cells.push(
                    <div className="cell" onClick={() => this.props.toggleNumber({ row, col, value: this.props.selectedNumber })} key={`${row}-${col}`}>
                        <div className="cellContents" >
                            {cellComponent}
                        </div>
                    </div>);
            }
        }
        return (<div className="boardGrid">{cells}</div>);
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

const mapStateToProps = (state: RootState) => ({
    board: state.board.board,
    selectedNumber: state.selection.selectedNumber,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    toggleNumber: bindActionCreators(actions.toggleNumber, dispatch),
});

interface StateFromProps {
    board: Board;
    selectedNumber: number;
}

interface DispatchFromProps {
    toggleNumber: (ToggleNumberPayload) => void;
}

export default connect<StateFromProps, DispatchFromProps, void>(
    mapStateToProps,
    mapDispatchToProps
)(BoardGrid);
