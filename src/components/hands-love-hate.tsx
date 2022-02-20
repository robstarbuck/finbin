import React, { FC, useState } from "react";
import { Hand } from "./hand";
import { getParams } from "../lib/params";
import "./hands.css";
import {
  FingerNames,
  indexOfFingerOnLeft,
  indexOfFingerOnRight,
} from "../lib/fingers";

interface Props {
  params: URLSearchParams;
}

const HandsLoveHate: FC<Props> = (props) => {
  const { params } = props;
  const { showControls, rightToLeft } = getParams(params);
  const maxValue = Number(params.get("maxValue") ?? 2 ** 4);

  const fingersRequired = maxValue.toString(2).length;

  const leftFingers = ["❤️️", "L", "O", "V", "E"];
  const rightFingers = ["H", "A", "T", "E", "🖤"];
  const values = leftFingers;

  const handsRequired = 1;

  const allHands = [0];

  const [total, setCharacter] = useState(values);

  const onClick = (index: number) => {
    console.log(index);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value;
    setCharacter(values);
  };

  return (
    <>
      <section>
        <article>
          {allHands.map((handIndex) => {
            const startingFingerIndex = handIndex * 5;
            const isRight = handIndex % 2 === 1;

            const getFinger = (finger: FingerNames) => {
              const indexOfFinger = isRight
                ? indexOfFingerOnRight
                : indexOfFingerOnLeft;
              const localIndex = indexOfFinger(finger);
              const index = localIndex + startingFingerIndex;
              const value = values[localIndex + startingFingerIndex];
              return {
                value,
                extended: true,
                onClick: () => onClick(index),
              };
            };

            return (
              <Hand
                isRight={isRight}
                key={handIndex}
                title={`Hand ${handIndex}`}
                thumb={getFinger("thumb")}
                index={getFinger("index")}
                middle={getFinger("middle")}
                ring={getFinger("ring")}
                little={getFinger("little")}
              />
            );
          })}
        </article>
      </section>
      {showControls && (
        <footer>
          <label>
            <input
              type="number"
              value={total}
              onChange={onChange}
              min={0}
              max={maxValue}
            />
          </label>
        </footer>
      )}
    </>
  );
};

export { HandsLoveHate };
