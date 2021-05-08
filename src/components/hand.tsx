import React, { FC, Fragment, ReactElement } from "react";
import { FingerNames, nameFromIndex } from "../lib/fingers";
import "./hand.css";
import cn from "classnames";

const fingerPaths: Record<FingerNames, [string, string]> = {
  Thumb: [
    "M73.935 316.755a415.412 415.412 0 00-4.526-4.459 109.184 109.184 0 01-30.405-53.451c-5.355-22.6-11.497-48.632-12.534-53.028a5.012 5.012 0 00-.468-1.229L7.435 170.239a1.505 1.505 0 01-.023-1.386 1.505 1.505 0 011.121-.814h.004a30.123 30.123 0 0128.568 11.716l10.108 13.477 19.139 22.591s62.451 14.252 62.451 60.087",
    "M73.935 316.763a662.15 662.15 0 00-1.2-1.196 109.207 109.207 0 01-31.222-62.27c-.805-5.676-1.614-11.41-2.375-16.801a27.81 27.81 0 0124.621-31.539l12.172-1.283 17.329-2.599a2.765 2.765 0 013.115 2.156v.001a26.448 26.448 0 01-11.127 27.503l-12.504 8.388s56.059-9.04 56.059 36.795",
  ],
  Index: [
    "M66.631 187.095L59.66 74.688a5.001 5.001 0 013.58-5.106l7.805-2.295a4.996 4.996 0 016.335 3.932l18.129 103.337.033.116",
    "M101.336 167.973a10 10 0 00-5.256-7.887l-5.279-2.81a14.999 14.999 0 00-19.082 4.284l-4.349 5.843a9.999 9.999 0 00-1.877 7.393l4.922 34.251 8.316 21.993a9.999 9.999 0 009.752 6.455l5.652-.225a10.001 10.001 0 009.543-8.907c.827-6.573 1.733-15.409 1.278-20.874-.807-9.694-2.705-29.872-3.62-39.516z",
  ],
  Middle: [
    "M105.585 172.312l3.675-115.763a4.999 4.999 0 014.997-4.841h10.319a5 5 0 014.997 4.835l3.754 113.782",
    "M138.899 168.375a9.998 9.998 0 00-3.482-7.914l-5.547-4.76a15 15 0 00-19.256-.234l-5.445 4.446a10.004 10.004 0 00-3.645 8.524c.733 9.498 2.322 29.496 3.432 39.052.662 5.69 1.994 16.175 2.959 23.689a10 10 0 009.948 8.738l6.687-.019a9.999 9.999 0 009.794-8.123c1.536-7.348 3.54-17.826 3.564-23.267.047-10.46.685-30.863.991-40.132z",
  ],
  Ring: [
    "M142.179 171.059l15.403-103.46a4.999 4.999 0 016.09-4.131l7.72 1.816a5 5 0 013.852 5.035l-3.632 108.116",
    "M176.527 176.598a10.002 10.002 0 00-2.811-9.123l-6.713-6.567a14.999 14.999 0 00-17.364-2.609l-5.174 2.668a10 10 0 00-5.405 8.385c-.519 9.828-1.464 29.683-1.152 39.155.167 5.071.637 14.639 1.007 21.893a10 10 0 0010.018 9.512l4.814-.015a9.998 9.998 0 009.572-7.208c2.074-6.985 5.064-17.281 6.246-22.534 1.865-8.288 5.243-24.991 6.962-33.557z",
  ],
  Little: [
    "M179.955 182.04l26.739-73.594a5 5 0 016.381-3.001l5.127 1.831a5 5 0 013.19 5.833l-19.136 82.947",
    "M204.441 193.204c.861-2.278.862-4.791.002-7.07l-3.318-8.785a11.072 11.072 0 00-11.294-7.12l-4.961.42a10 10 0 00-8.922 7.816c-2.006 8.944-5.278 23.962-6.383 31.69-.552 3.862-1.216 10.169-1.758 15.694a9.997 9.997 0 009.976 11.053c.785-.001 1.56-.003 2.305-.006a10 10 0 009.076-5.875l5.927-13.09 9.35-24.727z",
  ],
};

const fingers = Object.keys(fingerPaths);

const rightStyle = { transform: `scale(-1, 1) translate(-100%)` };

const circleX = [23.891, 71.674, 119.456, 167.238, 215.021];

// Export

interface Props<V> {
  index?: number;
  fingerPointing: (value: V) => boolean;
  values: ReadonlyArray<V | undefined>;
  onClick: (value: V) => void;
  isRight: boolean;
}

const Hand = <V extends unknown>(props: Props<V>): ReactElement => {
  const { values, fingerPointing, isRight, onClick: onClickProp } = props;

  const flipHand = isRight;
  const indexes = isRight ? [4, 3, 2, 1, 0] : [0, 1, 2, 3, 4];

  const isDisabled = (index: number) => values[index] === undefined;

  const isPointing = (value: V) => fingerPointing(value);

  const onClick = (value: V) => () => onClickProp(value);

  return (
    <svg
      viewBox="0 0 239 360"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
    >
      <title>Hand</title>
      <g>
        <g>
          {indexes.map((_, index) => {
            const fName = fingers[index];
            const value = values[index];
            const onCircleClick = value ? onClick(value) : undefined;
            return (
              <Fragment key={index}>
                <circle
                  onMouseDown={onCircleClick}
                  cx={circleX[index]}
                  cy={20}
                  r={17.474}
                  className={
                    value && isPointing(value) ? "highlight" : "lowlight"
                  }
                />
                <circle
                  onMouseDown={onCircleClick}
                  cx={circleX[index]}
                  cy={20}
                  r={17.474}
                  opacity={0}
                  cursor="pointer"
                >
                  <title>
                    {fName} Finger {index}
                  </title>
                </circle>
              </Fragment>
            );
          })}
        </g>

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
          {indexes.map((vIndex, index) => {
            const value = values[vIndex];
            const fingerName = nameFromIndex(index);
            const paths = fingerPaths[fingerName];
            const pointing = value ? isPointing(value) : false;
            const closed = !pointing;

            const onFingerClick = value ? onClick(value) : undefined;

            return (
              <g
                key={index}
                onMouseDown={onFingerClick}
                className={cn({ pointing, closed })}
              >
                <path d={paths[0]}>
                  <title>
                    {fingerName} Finger {value}
                  </title>
                </path>
                <path d={paths[1]}>
                  <title>
                    {fingerName} Finger {value}
                  </title>
                </path>
              </g>
            );
          })}
        </g>

        {/* Labels */}
        <g>
          {indexes.map((_, index) => {
            const value = values[index] ? String(values[index]) : null;
            return (
              <text
                opacity={isDisabled(index) ? 0.2 : 1}
                key={index}
                x={circleX[index]}
                y={20}
                fontFamily="sans-serif"
                fontSize={11}
                textAnchor="middle"
                dominantBaseline="central"
                pointerEvents="none"
              >
                {value}
              </text>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export { Hand };
