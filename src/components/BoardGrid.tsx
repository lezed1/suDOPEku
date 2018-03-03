import * as React from "react";
import "./../assets/scss/BoardGrid.scss";
import { Board, Cell, Location } from "../lib/sudopeku";
import { connect } from "react-redux";
import { BoardState } from "../reducers/boardReducer";
import { bindActionCreators, Dispatch } from "redux";
import { actions, TToggleValuePayload } from "../actions/actions";
import { RootState } from "../reducers/rootReducer";


export interface BoardProps {
    board: Board;
    selectedValue: number;
    toggleValue(payload: TToggleValuePayload): () => void;
}

class BoardGrid extends React.Component<BoardProps, undefined> {
    createGrid() {
        const size = this.props.board.size;
        const cells = [];
        for (let row = 1; row <= size; row++) {
            for (let col = 1; col <= size; col++) {
                const cellComponent = this.props.board.board.get(new Location(row, col)).getComponent(this.props.selectedValue);
                cells.push(
                    <div className="cell" onClick={() => this.props.toggleValue({ row, col, value: this.props.selectedValue })} key={`${row}-${col}`}>
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
    selectedValue: state.selection.selectedValue,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    toggleValue: bindActionCreators(actions.toggleValue, dispatch),
});

interface StateFromProps {
    board: Board;
    selectedValue: number;
}

interface DispatchFromProps {
    toggleValue: (payload: TToggleValuePayload) => void;
}

export default connect<StateFromProps, DispatchFromProps, void>(
    mapStateToProps,
    mapDispatchToProps
)(BoardGrid);
