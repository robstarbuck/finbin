import React, { FC, useState } from "react";
import { Hand } from "./hand";
import "./hands.css";
import {
  FingerNames,
  indexOfFingerOnLeft,
  indexOfFingerOnRight,
} from "../lib/fingers";

interface Props {
  hideControls?: boolean;
  maxValue?: number;
  initialValue?: number;
  lockValue?: boolean;
}

const HandsBinary: FC<Props> = (props) => {
  const {
    hideControls,
    lockValue,
    initialValue: _initialValue,
    maxValue: _maxValue,
  } = props;
  const maxValue = _maxValue ?? 2 ** 10 - 1;
  const initialValue =
    _initialValue !== undefined ? Math.min(_initialValue, maxValue) : maxValue;

  const fingersRequired = maxValue.toString(2).length;

  const values = Array(fingersRequired)
    .fill(null)
    .map((_, i) => 2 ** i);

  const handsRequired = Math.ceil(fingersRequired / 5);

  const allHands = Array(handsRequired)
    .fill(1)
    .map((_, i) => i)
    .reverse();

  const [total, setTotal] = useState(() => initialValue);

  const onChange = (value: number) => {
    const newValue = total ^ value;

    if (newValue > maxValue) {
      return;
    }
    // console.log({ newValue, maxValue });
    setTotal(newValue);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = Number(e.target.value);
    if (newTotal > maxValue) {
      return;
    }
    setTotal(newTotal);
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
              const onClick = lockValue ? undefined : () => onChange(value);
              return {
                value,
                extended: Boolean(value & total),
                onClick,
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
      {!hideControls && (
        <footer>
          <label>
            <input
              readOnly={lockValue}
              type="number"
              value={total}
              onChange={lockValue ? undefined : onInputChange}
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
