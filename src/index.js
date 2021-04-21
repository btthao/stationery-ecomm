import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./Components/context";
import { initialState, reducer } from "./Components/reducer";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </ContextProvider>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
