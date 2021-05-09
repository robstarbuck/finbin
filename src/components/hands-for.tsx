import React, { FC } from "react";
import { HandsBinary } from "./hands-binary";
import { HandsDecimal } from "./hands-decimal";
import { HandsLoveHate } from "./hands-love-hate";

export interface Props {
  params: URLSearchParams;
}

interface PropsPrivate {
  type: "love-hate" | "binary" | "decimal";
}

const HandsSwitch: FC<PropsPrivate> = (props) => {
  const { type } = props;
  const params = new URLSearchParams(document.location.search);

  const fill = params.get("fill");
  if (fill) {
    document.documentElement.style.setProperty("--fill", fill);
  }

  switch (type) {
    case "binary":
      return (
        <div className="App">
          <HandsBinary params={params} />
        </div>
      );
    case "decimal":
      return (
        <div className="App">
          <HandsDecimal params={params} />
        </div>
      );
    case "love-hate":
      return (
        <div className="App">
          <HandsLoveHate params={params} />
        </div>
      );
  }
  return null;
};

export { HandsSwitch };
