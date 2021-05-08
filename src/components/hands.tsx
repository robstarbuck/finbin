import React, { FC, useState } from "react";
import { Hand } from "./hand";
import produce from "immer";
import "./hands.css";
import { valueToFingerCount, valueToHandCount } from "../lib/fingers";

interface Props {
  maxValue?: number;
  showInput?: boolean;
}

const Hands: FC<Props> = (props) => {
  const { showInput, maxValue = 1023 } = props;

  const [value, setValue] = useState(maxValue);
  const maxFingers = valueToFingerCount(maxValue);

  const onClick = (fingerIndex: number) => {
    console.log({ fingerIndex, maxFingers });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handCount = valueToHandCount(maxValue);
  const showLeftHand = handCount > 1;

  return (
    <>
      <article>
        {showLeftHand && (
          <div className="left">
            <Hand left pointing={[true, true, true]} onClick={onClick} />
          </div>
        )}
        <div className="right">
          <Hand right pointing={[true, false]} onClick={onClick} />
        </div>
        {showInput && (
          <footer>
            <label>
              <input
                type="number"
                value={value}
                onChange={onChange}
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
