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

const HandsBinary: FC<Props> = (props) => {
  const { params } = props;
  const { showControls, rightToLeft } = getParams(params);
  const maxValue = Number(params.get("maxValue") ?? 2 ** 9);

  const fingersRequired = maxValue.toString(2).length;

  const values = Array(fingersRequired)
    .fill(null)
    .map((_, i) => 2 ** i);

  const handsRequired = Math.ceil(fingersRequired / 5);

  const allHands = Array(handsRequired)
    .fill(1)
    .map((_, i) => i)
    .reverse();

  const [total, setTotal] = useState(maxValue);

  const onClick = (value: number) => {
    setTotal(total ^ value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(Number(e.target.value));
  };

  console.log({ allHands });

  return (
    <>
      <section>
        <article>
          {allHands.map((handIndex) => {
            const startingFingerIndex = handIndex * 5;
            const isRight = handIndex % 2 === 0;

            const getFinger = (finger: FingerNames) => {
              const indexOfFinger = isRight
                ? indexOfFingerOnRight
                : indexOfFingerOnLeft;
              const localIndex = indexOfFinger(finger);
              const value = values[localIndex + startingFingerIndex];
              return {
                value,
                extended: Boolean(value & total),
                onClick: () => onClick(value),
              };
            };

            return (
              <Hand
                isRight={!isRight}
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

export { HandsBinary };
