import React from "react";
import "./App.css";
import { Hands } from "./components/hands";

function App() {
  const params = new URLSearchParams(document.location.search);

  const showInput = params.get("showInput") === "1";
  const rightToLeft = params.get("rightToLeft") === "1";
  const maxValue = Number(params.get("maxValue") ?? 1023);

  const fill = params.get("fill");
  if (fill) {
    document.documentElement.style.setProperty("--fill", fill);
  }

  return (
    <div className="App">
      <Hands
        showInput={showInput}
        maxValue={maxValue}
        rightToLeft={rightToLeft}
      />
    </div>
  );
}

export default App;
