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
                {
                    this.props.selectedNumber
                }
                {
                    R.range(1, 9).map((i) =>
                        <div key={i} onClick={() => this.props.selectNumber({selectedNumber: i})}>
                            {i}
                        </div>
                    )
                }
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
