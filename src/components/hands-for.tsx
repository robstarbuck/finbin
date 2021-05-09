import React, { FC } from "react";
import { HandsDecimal } from "./hands-decimal";

export interface Props {
  params: URLSearchParams;
}

interface PropsPrivate {
  type: "love-hate" | "binary" | "decimal";
}

const HandsFor: FC<PropsPrivate> = (props) => {
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
          <HandsDecimal params={params} />
        </div>
      );
    case "decimal":
      return (
        <div className="App">
          <HandsDecimal params={params} />
        </div>
      );
  }
  return null;
};

export { HandsFor };
