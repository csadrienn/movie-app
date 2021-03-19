import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HighlightsProvider } from "./context/highlightsContext";
import { SearchProvider } from "./context/searchContext";
import { DetailsProvider } from "./context/detailsContext";
import { DiscoverProvider } from "./context/discoverContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <DiscoverProvider>
      <HighlightsProvider>
        <SearchProvider>
          <DetailsProvider>
            <App />
          </DetailsProvider>
        </SearchProvider>
      </HighlightsProvider>
    </DiscoverProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
