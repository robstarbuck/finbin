import React from "react";
import "./App.css";
import { Hands } from "./components/hands";

function App() {
  const params = new URLSearchParams(document.location.search);
  const showInput = Boolean(params.get("showInput"));
  const fill = params.get("fill");

  if (fill) {
    document.documentElement.style.setProperty("--fill", fill);
  }

  return (
    <div className="App">
      <Hands showInput={showInput} />
    </div>
  );
}

export default App;
