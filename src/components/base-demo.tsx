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
  const { from, renderValue = (v) => v, padding = 8 } = props;

  const paddedValue = from.padStart(padding, "0");
  const fromLen = from.length;

  return (
    <div className="row">
      {paddedValue.split("").map((v, i) => {
        const isPadding = padding - i > fromLen || (fromLen === 1 && v === "0");
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
          <Values
            from={value.toString(2)}
            renderValue={(v) => (v === "0" ? "\uE06B" : v)}
          />
          <Values from={value.toString(10)} />
          <Values
            from={value.toString(26)}
            renderValue={(v) =>
              (parseInt(v, 26) + 10).toString(36).toUpperCase()
            }
          />
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
