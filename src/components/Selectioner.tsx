import * as React from "react";
import "./../assets/scss/Selectioner.scss";
import { Board, Cell, Location } from "../lib/sudopeku";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions, TSelectValuePayload, TToggleValuePayload } from "../actions/actions";
import { RootState } from "../reducers/rootReducer";
import * as R from "ramda";


export interface ISelectionerProps {
    selectedValue: number;

    selectValue(payload: TSelectValuePayload): () => void;
}

class Selectioner extends React.Component<ISelectionerProps, undefined> {
    render() {
        return (
            <div className="selectioner">
                <div className="selectionerGrid">
                    {
                        R.range(1, 10).map((i) =>
                            <div className={`cell${this.props.selectedValue === i ? " selected" : ""}`} key={i} onClick={() => this.props.selectValue({ selectedValue: i })}>
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
    selectedValue: state.selection.selectedValue,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    selectValue: bindActionCreators(actions.selectValue, dispatch),
});

interface StateFromProps {
    selectedValue: number;
}

interface DispatchFromProps {
    selectValue: (payload: TSelectValuePayload) => void;
}

export default connect<StateFromProps, DispatchFromProps, void>(
    mapStateToProps,
    mapDispatchToProps
)(Selectioner);
