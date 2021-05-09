import React, { FC, useState } from "react";
import { Hands } from "./hands";
import { getParams } from "../lib/params";

interface Props {
  params: URLSearchParams;
}

type HandShown = "left" | "right";

const HandsLoveHate: FC<Props> = (props) => {
  const { params } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showControls, ...passed } = getParams(params);

  const leftFingers = ["❤️️", "L", "O", "V", "E"];
  const rightFingers = ["H", "A", "T", "E", "🖤"];

  const [handShown, setHandShown] = useState<HandShown>("left");

  const onClick = (_: string | undefined, index: number) => {
    setHandShown(index < 5 ? "left" : "right");
  };

  const fingerPointing = (_: string | undefined, index: number) => {
    const rightFinger = index > 4;
    const leftFinger = !rightFinger;
    if (rightFinger && handShown === "right") {
      return true;
    }
    if (leftFinger && handShown === "left") {
      return true;
    }
    return false;
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLetters(Number(e.target.value));
  // };

  return (
    <>
      <Hands
        {...passed}
        count={2}
        rightToLeft={false}
        onClick={onClick}
        fingerPointing={fingerPointing}
        fingerValues={(i) => [leftFingers, rightFingers][i]}
      />
      {/* {showControls && (
        <footer>
          <label>
            <input
              type="number"
              value={letters}
              onChange={onChange}
              min={0}
              max={maxValue}
            />
          </label>
        </footer>
      )} */}
    </>
  );
};

export { HandsLoveHate };
