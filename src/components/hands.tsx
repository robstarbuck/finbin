import React, { ReactElement } from "react";
import { Hand } from "./hand";
import "./hands.css";

interface Props<V> {
  count: number;
  yours?: boolean;
  rightToLeft?: boolean;
  fingerValues: (hand: number) => ReadonlyArray<V>;
  fingerPointing: (finger: V, index: number) => boolean;
  onClick: (finger: V, index: number) => void;
}

const Hands = <V extends unknown>(props: Props<V>): ReactElement => {
  const {
    yours,
    count,
    rightToLeft,
    fingerValues,
    fingerPointing,
    onClick,
  } = props;

  const hands = Array(count)
    .fill(null)
    .map((_, i) => i);

  const setDirection = <V extends unknown>(array: ReadonlyArray<V>) => {
    return rightToLeft ? [...array].reverse() : array;
  };

  return (
    <section>
      <article>
        {setDirection(hands).map((handIndex, i) => {
          const values = fingerValues(handIndex);
          const isRight = yours ? !(i % 2) : !!(i % 2);

          return (
            <Hand
              key={handIndex}
              index={handIndex}
              isRight={isRight}
              values={setDirection(values)}
              fingerPointing={fingerPointing}
              onClick={onClick}
            />
          );
        })}
      </article>
    </section>
  );
};

export { Hands };
