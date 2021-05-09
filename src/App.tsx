import React from "react";
import "./App.css";
import { BinaryDemo } from "./components/base-demo";
import { HandsSwitch } from "./components/hands-for";

const App = () => {
  const params = new URLSearchParams(document.location.search);

  const fill = params.get("fill");
  if (fill) {
    document.documentElement.style.setProperty("--fill", fill);
  }

  return (
    <div className="App">
      <BinaryDemo />
    </div>
  );

  return (
    <div className="App">
      <HandsSwitch type="love-hate" />
    </div>
  );
};

export default App;
