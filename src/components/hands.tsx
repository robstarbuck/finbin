import React, { FC, useState } from "react";
import { Hand } from "./hand";
import produce from "immer";
import "./hands.css";
import {
  Fingers,
  fingersToValue,
  valueToFingerCount,
  valueToFingers,
  valueToHandCount,
} from "../lib/fingers";

interface Props {
  maxValue?: number;
  showInput?: boolean;
}

const Hands: FC<Props> = (props) => {
  const { showInput, maxValue = 1023 } = props;

  const [pointing, setPointing] = useState<Fingers>(valueToFingers(maxValue));
  const maxFingers = valueToFingerCount(maxValue);

  const onClick = (fingerIndex: number) => {
    console.log({ fingerIndex, maxFingers });
    setPointing((previous) => {
      return produce(previous, (values) => {
        values[fingerIndex] = !values[fingerIndex];
      });
    });
  };

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fingers = valueToFingers(Number(e.target.value));
    setPointing(fingers);
  };

  const leftFingers = [
    pointing[0], // Thumb
    pointing[1],
    pointing[2],
    pointing[3],
    pointing[4],
  ] as const;

  const rightFingers = [
    pointing[5],
    pointing[6],
    pointing[7],
    pointing[8],
    pointing[9], // Thumb
  ] as const;

  const value = fingersToValue(pointing);
  const handCount = valueToHandCount(maxValue);
  const showLeftHand = handCount > 1;

  return (
    <>
      <article>
        {showLeftHand && (
          <div className="left">
            <Hand left pointing={leftFingers} onClick={onClick} />
          </div>
        )}
        <div className="right">
          <Hand right pointing={rightFingers} onClick={onClick} />
        </div>
        {showInput && (
          <footer>
            <label>
              <input
                type="number"
                value={value}
                onChange={setValue}
                max={maxValue}
              />
            </label>
          </footer>
        )}
      </article>
    </>
  );
};

export { Hands };
