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

export const binaryToFingerCount = (value: number) => {
  return value.toString(2).length;
};

export const binaryHandCount = (value: number) => {
  const fingerCount = binaryToFingerCount(value);
  return Math.ceil(fingerCount / 5);
};

export const handToFingersBinary = (hand: number) => {
  return [0, 1, 2, 3, 4].map((v) => 2 ** (v + hand * 5));
};

export const handToFingersDecimal = (hand: number) => {
  return [1, 2, 3, 4, 5].map((v) => v + hand * 5);
};
