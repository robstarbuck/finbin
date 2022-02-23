import React, { Fragment, ReactElement } from "react";
import {
  fingersThumbToLittle,
  fingersLittleToThumb,
  fingerTitle,
} from "../../lib/fingers";
import "./style.css";
import cn from "classnames";
import { fingerPaths } from "./svg-paths";

const rightStyle = { transform: `scale(-1, 1) translate(-100%)` };

const circleX = [23.891, 71.674, 119.456, 167.238, 215.021];

type Finger<V> = { value: V; extended: boolean; onClick?: () => void };

interface Props<V> {
  thumb?: Finger<V>;
  index?: Finger<V>;
  middle?: Finger<V>;
  ring?: Finger<V>;
  little?: Finger<V>;

  isRight?: boolean;
  title?: string;
}

const Hand = <V extends unknown>(props: Props<V>): ReactElement => {
  const { isRight, title = "Hand", ...fingers } = props;

  const flipHand = isRight;

  const fiveFingers = isRight ? fingersLittleToThumb : fingersThumbToLittle;

  return (
    <svg
      className="hand"
      viewBox="0 0 239 360"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
    >
      <title>{title}</title>
      <g>
        {fiveFingers.map((name, index) => {
          const value = fingers[name];
          const onClick = value?.onClick;
          const isExtended = value?.extended;

          return (
            <Fragment key={index}>
              <circle
                onMouseDown={onClick}
                cx={circleX[index]}
                cy={20}
                r={17.474}
                className={isExtended ? "highlight" : "lowlight"}
              />
              <circle
                onMouseDown={onClick}
                cx={circleX[index]}
                cy={20}
                r={17.474}
                opacity={0}
                cursor="pointer"
              >
                <title>
                  {fingerTitle(name)} Finger {index}
                </title>
              </circle>
            </Fragment>
          );
        })}

        {/* Hand */}
        <g stroke="#000" style={flipHand ? rightStyle : undefined}>
          {/* Palm */}
          <path d="M133.238 167.627l.123 3.721a4.409 4.409 0 004.406 4.262h.002a4.328 4.328 0 004.282-3.692l.525-3.526a121.092 121.092 0 0129.132 7.183l-.183 5.447a4.168 4.168 0 003.022 4.149s0 0 0 0a4.315 4.315 0 005.242-2.676l1.09-2.999a120.634 120.634 0 0122.046 13.658l-1.385 6.004a4.997 4.997 0 00-.129 1.156c.098 20.642 5.002 32.816 5.002 61.573 0 42.834-34.776 77.61-77.61 77.61-21.417 0-40.82-8.694-54.868-22.742-14.048-14.048-22.742-33.451-22.742-54.868 0-17.656 5.908-33.944 15.854-46.989l.361-14.975a4.74 4.74 0 00-.008-.43l-.955-15.4a119.832 119.832 0 0128.617-12.087l.447 2.55a5.001 5.001 0 006.01 4.017l.105-.023a5 5 0 003.912-4.723l.136-4.269c7.224-1.368 14.678-2.064 22.294-2.064l5.272.133z" />
          {/* Wrinkle */}
          <path
            d="M79.254 191.904c14.885-7.571 31.725-11.821 49.549-11.821 22.691 0 43.787 6.888 61.308 18.691"
            fill="none"
            strokeOpacity={0.2}
          />
          {fingersLittleToThumb.map((name, index) => {
            const finger = fingers[name];
            const value = finger?.value ?? "";
            const onClick = finger?.onClick;
            const isExtended = finger?.extended ?? false;
            const isClosed = !isExtended;

            const closedFingerPath = fingerPaths[name][0];
            const extendedFingerPath = fingerPaths[name][1];

            return (
              <g
                key={index}
                onMouseDown={onClick}
                className={cn({ isExtended, isClosed })}
              >
                <path d={closedFingerPath}>
                  <title>
                    {fingerTitle(name)} Finger {value}
                  </title>
                </path>
                <path d={extendedFingerPath}>
                  <title>
                    {fingerTitle(name)} Finger {value}
                  </title>
                </path>
              </g>
            );
          })}
        </g>

        {/* Labels */}
        <g>
          {fiveFingers.map((name, index) => {
            const value = fingers[name]?.value;
            const disabled = fingers[name]?.onClick === undefined;
            const label = value ? String(value) : "";
            return (
              <text
                opacity={disabled ? 0.2 : 1}
                key={index}
                x={circleX[index]}
                y={20}
                fontFamily="sans-serif"
                fontSize={11}
                textAnchor="middle"
                dominantBaseline="central"
                pointerEvents="none"
              >
                {label}
              </text>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export { Hand };
