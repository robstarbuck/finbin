import React, { FC, Fragment, useState } from "react";
import { Hand } from "./hand";
import "./hands.css";
import { valuesForHand, valueToHandCount } from "../lib/fingers";

interface Props {
  yours?: boolean;
  maxValue?: number;
  showInput?: boolean;
  rightToLeft?: boolean;
}

const Hands: FC<Props> = (props) => {
  const { showInput, rightToLeft, yours, maxValue = 1023 } = props;

  const [total, setTotal] = useState(maxValue);
  const handCount = valueToHandCount(maxValue);

  const onClick = (value: number) => {
    const addValue = (total ^ value) > total;

    setTotal((t) => (addValue ? t + value : t - value));
  };

  const fingerPointing = (value: number) => {
    return (total & value) > 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(Number(e.target.value));
  };

  const hands = Array(handCount)
    .fill(null)
    .map((_, i) => i);

  const setDirection = <V extends unknown>(array: Array<V>) => {
    return rightToLeft ? [...array].reverse() : array;
  };

  return (
    <section>
      <article>
        {setDirection(hands).map((handIndex, i) => {
          const values = valuesForHand(handIndex);
          const isRight = yours ? !(i % 2) : Boolean(i % 2);

          return (
            <Fragment key={handIndex}>
              <Hand
                isRight={isRight}
                key={handIndex}
                index={handIndex}
                values={setDirection(values)}
                fingerPointing={fingerPointing}
                onClick={onClick}
              />
            </Fragment>
          );
        })}
      </article>
      {showInput && (
        <footer>
          <label>
            <input
              type="number"
              value={total}
              onChange={onChange}
              max={maxValue}
            />
          </label>
        </footer>
      )}
    </section>
  );
};

export { Hands };
