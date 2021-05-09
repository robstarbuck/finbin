import React, { useState } from "react";
import "./App.css";
import { HandsFor } from "./components/hands-for";

const App = () => {
  const params = new URLSearchParams(document.location.search);

  const fill = params.get("fill");
  if (fill) {
    document.documentElement.style.setProperty("--fill", fill);
  }

  return (
    <div className="App">
      <HandsFor type="binary" />
    </div>
  );
};

export default App;
