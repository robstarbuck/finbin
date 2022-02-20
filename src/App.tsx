import React from "react";
import "./App.css";
import { BinaryDemo } from "./components/base-demo";
import { HandsBinary } from "./components/hands-binary";
import { HandsLoveHate } from "./components/hands-love-hate";

const App = () => {
  const params = new URLSearchParams(document.location.search);

  const fill = params.get("fill");
  if (fill) {
    document.documentElement.style.setProperty("--fill", fill);
  }

  // return (
  //   <div className="App">
  //     <BinaryDemo />
  //   </div>
  // );

  switch (type) {
    case "binary":
      return (
        <div className="App">
          <HandsBinary params={params} />
        </div>
      );
    case "decimal":
      return (
        <div className="App">{/* <HandsDecimal params={params} /> */}</div>
      );
    case "love-hate":
      return (
        <div className="App">
          <HandsLoveHate params={params} />
        </div>
      );
  }
};

export default App;
