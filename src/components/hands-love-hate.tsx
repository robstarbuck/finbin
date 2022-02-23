import React, { FC, useState } from "react";
import { Hand } from "./hand";
import "./hands.css";
import {
  FingerNames,
  indexOfFingerOnLeft,
  indexOfFingerOnRight,
} from "../lib/fingers";

const HandsLoveHate: FC = () => {
  const leftFingers = ["❤️️", "L", "O", "V", "E"];
  const rightFingers = ["H", "A", "T", "E", "🖤"];
  const values = [...leftFingers, ...rightFingers];

  const allHands = [0, 1];

  const [closed, setClosed] = useState<number | undefined>(undefined);

  const onClick = (index: number) => {
    setClosed(index);
  };

  return (
    <>
      <section>
        <article>
          {allHands.map((handIndex) => {
            const startingFingerIndex = handIndex * 5;
            const isRight = handIndex % 2 === 1;

            const getFinger = (finger: FingerNames) => {
              const localIndex = isRight
                ? indexOfFingerOnRight(finger)
                : indexOfFingerOnLeft(finger);
              const value = values[localIndex + startingFingerIndex];
              return {
                value,
                extended: closed !== undefined ? handIndex === closed : true,
                onClick: () => onClick(handIndex),
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
    </>
  );
};

export { HandsLoveHate };
