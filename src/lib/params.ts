export interface Params {
  type?: string;
  maxBinaryValue?: number;
  hideControls: boolean;
}

export const getParams = (): Params => {
  const params = new URLSearchParams(document.location.search);
  const type = params.get("type") ?? undefined;

  const maxBinaryValueParam = parseInt(params.get("maxBinaryValue") ?? "");
  const maxBinaryValue = Number.isNaN(maxBinaryValueParam)
    ? undefined
    : maxBinaryValueParam;

  const hideControls = params.get("hideControls") ? true : false;

  return { type, maxBinaryValue, hideControls };
};
