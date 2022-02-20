import React, { FC, useState } from "react";
import { handToFingersDecimal } from "../lib/fingers";
import { getParams } from "../lib/params";

interface Props {
  params: URLSearchParams;
}

const HandsDecimal: FC<Props> = (props) => {
  const { params } = props;
  const { showControls, ...passed } = getParams(params);
  const maxValue = Number(params.get("maxValue") ?? 10);
  const handCount = Math.ceil(maxValue / 5);

  const [total, setTotal] = useState(maxValue);

  const onClick = (value: number) => {
    setTotal((total) => {
      if (value > maxValue) {
        return total;
      }
      if (total === value) {
        return value - 1;
      }
      return value;
    });
  };

  const fingerPointing = (value: number) => {
    return value <= total;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(Number(e.target.value));
  };

  return (
    <>
      {/* <Hands
        {...passed}
        count={handCount}
        onClick={onClick}
        fingerPointing={fingerPointing}
        fingerValues={handToFingersDecimal}
      /> */}
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

export { HandsDecimal };
