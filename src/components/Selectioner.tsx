import * as React from "react";
import "./../assets/scss/Selectioner.scss";
import { Board, Cell, Location, SelectionerState } from "../lib/sudopeku";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions, TSelectValuePayload, TToggleValuePayload } from "../actions/actions";
import { RootState } from "../reducers/rootReducer";
import * as R from "ramda";


export interface ISelectionerProps {
    selectionerState: SelectionerState;

    selectValue(payload: TSelectValuePayload): () => void;
    togglePencil(): void;
}

class Selectioner extends React.Component<ISelectionerProps, undefined> {
    render() {
        return (
            <div className="selectioner">
                <div className="selectionerGrid">
                    <div className="leftControls" />

                    <div className="numberGrid">
                        {
                            R.range(1, 10).map((i) =>
                                <div className={`cell ${this.props.selectionerState.selectedValue === i ? "selected" : ""}`} key={i} onClick={() => this.props.selectValue({ selectedValue: i })}>
                                    <span className="cellValue">{i}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className="rightControls">
                        <div className={`pencilButton ${this.props.selectionerState.isPencil ? "active" : ""}`} onClick={this.props.togglePencil}>
                            Pencil
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    selectionerState: state.selectioner,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    selectValue: bindActionCreators(actions.selectValue, dispatch),
    togglePencil: bindActionCreators(actions.togglePencil, dispatch),
});

interface StateFromProps {
    selectionerState: SelectionerState;
}

interface DispatchFromProps {
    selectValue: (payload: TSelectValuePayload) => void;
    togglePencil: () => void;
}

export default connect<StateFromProps, DispatchFromProps, void>(
    mapStateToProps,
    mapDispatchToProps
)(Selectioner);
