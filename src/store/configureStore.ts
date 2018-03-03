import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

export default function configureStore() {
    let devtools;

    if (window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")) {
        devtools = window["__REDUX_DEVTOOLS_EXTENSION__"]();
    }

    return createStore(
        rootReducer,
        devtools
    );
}