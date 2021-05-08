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

export const valueToFingers = (value: number): Fingers => {
  const binary = value.toString(2);
  const paddedBinary = binary.padStart(10, "0");

  const values = paddedBinary.split("").map((v) => v === "1");
  return values as Fingers;
};

export const fingersToValue = (fingers: Fingers) => {
  return parseInt(fingers.map(Number).join(""), 2);
};

export const valueToFingerCount = (value: number) => {
  return value.toString(2).length;
};

export const valueToHandCount = (value: number) => {
  const fingerCount = valueToFingerCount(value);
  return Math.ceil(fingerCount / 5);
};
