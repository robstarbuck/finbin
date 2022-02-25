export interface Params {
  type?: string;
  maxBinaryValue?: number;
  initialBinaryValue?: number;
  lockBinaryValue?: boolean;
  hideControls: boolean;
}

export const getParams = (): Params => {
  const params = new URLSearchParams(document.location.search);
  const type = params.get("type") ?? undefined;

  const initialBinaryValueParam = parseInt(
    params.get("initialBinaryValue") ?? ""
  );
  const initialBinaryValue = Number.isNaN(initialBinaryValueParam)
    ? undefined
    : initialBinaryValueParam;

  const lockBinaryValue = Boolean(params.get("lockBinaryValue")) ?? false;

  const maxBinaryValueParam = parseInt(params.get("maxBinaryValue") ?? "");
  const maxBinaryValue = Number.isNaN(maxBinaryValueParam)
    ? undefined
    : maxBinaryValueParam;

  const hideControls = params.get("hideControls") ? true : false;

  return {
    type,
    maxBinaryValue,
    lockBinaryValue,
    initialBinaryValue,
    hideControls,
  };
};
