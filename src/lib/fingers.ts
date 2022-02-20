export type FingerNames = "thumb" | "index" | "middle" | "ring" | "little";

export const fingersThumbToLittle: Array<FingerNames> = [
  "thumb",
  "index",
  "middle",
  "ring",
  "little",
];

export const fingersLittleToThumb: Array<FingerNames> = [
  "little",
  "ring",
  "middle",
  "index",
  "thumb",
];

export const indexOfFingerOnLeft = (name: FingerNames) => {
  return fingersThumbToLittle.indexOf(name);
};

export const indexOfFingerOnRight = (name: FingerNames) => {
  return fingersLittleToThumb.indexOf(name);
};

export const fingerTitle = (name: FingerNames) => {
  switch (name) {
    case "thumb":
      return "Thumb";
    case "index":
      return "Index";
    case "middle":
      return "Middle";
    case "ring":
      return "Ring";
    case "little":
      return "Little";
  }
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
