export function urlEncodeParams(params: Record<string, any>) {
  if (!Object.keys(params)) return "";

  return (
    "?" +
    Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&")
  );
}
