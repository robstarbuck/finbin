export interface Params {
  yours: boolean;
  showControls: boolean;
  rightToLeft: boolean;
}

export const getParams = (params: URLSearchParams): Params => {
  const yours = params.get("yours") === "1";
  const showControls = params.get("showControls") === "1";
  const rightToLeft = params.get("rightToLeft") !== "false";
  return { yours, showControls, rightToLeft };
};
