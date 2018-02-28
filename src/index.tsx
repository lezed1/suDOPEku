import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const rootEl = document.getElementById("root");
const store = configureStore();

render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;

        render(
            <AppContainer>
                <Provider store={store}>
                    <NewApp />
                </Provider>
            </AppContainer>,
            rootEl
        );
    });
}
