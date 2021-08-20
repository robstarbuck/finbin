import React, { ChangeEventHandler, FC, ReactNode, useState } from "react";
import "./base-demo.css";
import cn from "classnames";

interface ValuesProps {
  from: string;
  padding?: number;
  renderValue?: (v: string) => ReactNode;
  isZero?: (v: string) => boolean;
}

const Values: FC<ValuesProps> = (props) => {
  const { from, renderValue = (v) => v.toUpperCase(), padding = 8 } = props;

  const paddedValue = from.padStart(padding, "0");
  const fromLen = from.length;
  const valueIsZero = fromLen === 1 && from === "0";

  return (
    <div className="row">
      {Array.from(paddedValue).map((v, i) => {
        const isPadding = padding - i > fromLen || valueIsZero;
        return (
          <span key={i} className={cn({ isPadding })}>
            {renderValue(v)}
          </span>
        );
      })}
    </div>
  );
};

const BinaryDemo = () => {
  const [value, setValue] = useState(0);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.currentTarget.value);
    setValue(value);
  };

  return (
    <section>
      <article>
        <div className="base-demo">
          <Values from={value.toString(2)} />
          <Values from={value.toString(10)} />
          <Values from={value.toString(16)} />
          <div>
            <input
              value={value}
              type="range"
              onChange={onChange}
              min={0}
              max={255}
            />
          </div>
          <div>
            <input
              value={value}
              type="number"
              onChange={onChange}
              min={0}
              max={255}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export { BinaryDemo };
