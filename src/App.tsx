import React from "react";
import "./App.css";
import { HandsBinary } from "./components/hands-binary";
import { HandsLoveHate } from "./components/hands-love-hate";
import { ICustomWindow, setCloseTarget } from "./lib/open-window";
import { getParams } from "./lib/params";

const openWindow = () => setCloseTarget(window.open(String(window.location)));

const closeWindow = window.opener
  ? () => {
      const opener: ICustomWindow = window.opener;
      opener.closeWindow?.();
    }
  : null;

const App = () => {
  const { type, hideControls, initialBinaryValue, maxBinaryValue } =
    getParams();

  switch (type) {
    case "love-hate":
      return (
        <div className="App">
          <HandsLoveHate />
        </div>
      );
    default:
    case "binary":
      return (
        <div className="App">
          <HandsBinary
            hideControls={hideControls}
            maxValue={maxBinaryValue}
            initialValue={initialBinaryValue}
          />
          <footer>
            {closeWindow && (
              <button
                title="Close Window"
                className="windowAction -close"
                type="button"
                onClick={closeWindow}
              >
                ✗
              </button>
            )}
            {window.location !== window.parent.location && (
              <button
                title="Open in New Window"
                className="windowAction -open"
                type="button"
                onClick={openWindow}
              >
                ↗
              </button>
            )}
          </footer>
        </div>
      );
  }
};

export default App;
