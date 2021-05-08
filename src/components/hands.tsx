import React, { FC, useState } from "react";
import { Hand } from "./hand";
import produce from "immer";
import cn from "classnames";
import "./hands.css";
import { valuesForHand, valueToHandCount } from "../lib/fingers";

interface Props {
  maxValue?: number;
  showInput?: boolean;
}

const Hands: FC<Props> = (props) => {
  const { showInput, maxValue = 1023 } = props;

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

  const rightToLeft = false;

  const direction = <V extends unknown>(array: Array<V>) => {
    return rightToLeft ? [...array].reverse() : array;
  };

  return (
    <section>
      <article className={cn({ rightToLeft })}>
        {hands.map((i) => {
          const values = valuesForHand(i);
          return (
            <Hand
              isRight={!(i % 2)}
              key={i}
              index={i}
              values={direction(values)}
              fingerPointing={fingerPointing}
              onClick={onClick}
            />
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
