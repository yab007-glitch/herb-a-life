export function logRequest(
  method: string,
  path: string,
  status: number,
  durationMs: number
) {
  console.log(
    JSON.stringify({
      level: "info",
      type: "api_request",
      method,
      path,
      status,
      durationMs,
      timestamp: new Date().toISOString(),
    })
  );
}
