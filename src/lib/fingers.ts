export type Fingers = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

export type FingerNames = "Thumb" | "Index" | "Middle" | "Ring" | "Little";

const fingerIndexes: Array<FingerNames> = [
  "Thumb",
  "Index",
  "Middle",
  "Ring",
  "Little",
];

export const nameFromIndex = (index: number) => {
  const indexOnHand = index % 5;
  return fingerIndexes[indexOnHand];
};

export const valueToFingers = (value: number) => {
  const binary = value.toString(2);

  const values = binary.split("").map((v) => v === "1");
  return values;
};

export const valueToFingerCount = (value: number) => {
  return value.toString(2).length;
};

export const valueToHandCount = (value: number) => {
  const fingerCount = valueToFingerCount(value);
  return Math.ceil(fingerCount / 5);
};

export const valuesForHand = (index: number) => {
  return [0, 1, 2, 3, 4].map((v) => 2 ** (v + index * 5));
};
