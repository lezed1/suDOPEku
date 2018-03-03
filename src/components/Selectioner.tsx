import * as React from "react";
import "./../assets/scss/Selectioner.scss";
import { Board, Cell, Location } from "../lib/sudopeku";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions, TSelectNumberPayload } from "../actions/actions";
import { RootState } from "../reducers/rootReducer";
import * as R from "ramda";


export interface ISelectionerProps {
    selectedNumber: number;

    selectNumber(TSelectNumberPayload): () => void;
}

class Selectioner extends React.Component<ISelectionerProps, undefined> {
    render() {
        return (
            <div className="selectioner">
                <div className="selectionerGrid">
                    {
                        R.range(1, 10).map((i) =>
                            <div className={`cell${this.props.selectedNumber === i ? " selected" : ""}`} key={i} onClick={() => this.props.selectNumber({ selectedNumber: i })}>
                                <span className="cellValue">{i}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    selectedNumber: state.selection.selectedNumber,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    selectNumber: bindActionCreators(actions.selectNumber, dispatch),
});

interface StateFromProps {
    selectedNumber: number;
}

interface DispatchFromProps {
    selectNumber: (ToggleNumberPayload) => void;
}

export default connect<StateFromProps, DispatchFromProps, void>(
    mapStateToProps,
    mapDispatchToProps
)(Selectioner);
