import React from "react";
import "./App.css";
import { HandsBinary } from "./components/hands-binary";
import { HandsLoveHate } from "./components/hands-love-hate";
import { getParams } from "./lib/params";

const App = () => {
  const { type, hideControls, maxBinaryValue } = getParams();

  switch (type) {
    case "decimal":
      return (
        <div className="App">{/* <HandsDecimal params={params} /> */}</div>
      );
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
          <HandsBinary hideControls={hideControls} maxValue={maxBinaryValue} />
        </div>
      );
  }
};

export default App;
