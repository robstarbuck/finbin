import React, { FC, useState } from "react";
import { Hands } from "./hands";
import { handToFingersBinary, binaryHandCount } from "../lib/fingers";
import { getParams } from "../lib/params";

interface Props {
  params: URLSearchParams;
}

const HandsBinary: FC<Props> = (props) => {
  const { params } = props;
  const { showControls, ...passed } = getParams(params);
  const maxValue = Number(params.get("maxValue") ?? 1023);

  const [total, setTotal] = useState(maxValue);
  const handCount = binaryHandCount(maxValue);

  const onClick = (value: number) => {
    const addValue = (total ^ value) > total;

    setTotal((t) => {
      const newValue = addValue ? t + value : t - value;
      return newValue > maxValue ? t : newValue;
    });
  };

  const fingerPointing = (value: number) => {
    return (total & value) > 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(Number(e.target.value));
  };

  return (
    <>
      <Hands
        {...passed}
        count={handCount}
        onClick={onClick}
        fingerPointing={fingerPointing}
        fingerValues={handToFingersBinary}
      />
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
