import * as React from "react";
import "./../assets/scss/BoardGrid.scss";
import { Board, Cell, Location, SIZE, SelectionerState } from "../lib/sudopeku";
import { connect } from "react-redux";
import { BoardState } from "../reducers/boardReducer";
import { bindActionCreators, Dispatch } from "redux";
import { actions, TToggleValuePayload } from "../actions/actions";
import { RootState } from "../reducers/rootReducer";


export interface BoardProps {
    board: Board;
    selectionerState: SelectionerState;
    toggleValue(payload: TToggleValuePayload): () => void;
}

class BoardGrid extends React.Component<BoardProps, undefined> {
    createGrid() {
        const cells = [];
        for (let row = 1; row <= SIZE; row++) {
            for (let col = 1; col <= SIZE; col++) {
                const cell = this.props.board.board.get(new Location(row, col));
                const cellComponent = cell.getComponent(this.props.selectionerState);
                cells.push(
                    <div className={`cell ${cell.getCellClass(this.props.selectionerState)}`} onClick={() => this.props.toggleValue({ row, col, selectionerState: this.props.selectionerState })} key={`${row}-${col}`}>
                        {cellComponent}
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
    selectionerState: state.selectioner,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    toggleValue: bindActionCreators(actions.toggleValue, dispatch),
});

interface StateFromProps {
    board: Board;
    selectionerState: SelectionerState;
}

interface DispatchFromProps {
    toggleValue: (payload: TToggleValuePayload) => void;
}

export default connect<StateFromProps, DispatchFromProps, void>(
    mapStateToProps,
    mapDispatchToProps
)(BoardGrid);
