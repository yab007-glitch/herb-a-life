export function captureException(
  error: unknown,
  context?: Record<string, unknown>
) {
  const message =
    error instanceof Error ? error.message : String(error);
  const stack =
    error instanceof Error ? error.stack : undefined;

  console.error(
    JSON.stringify({
      level: "error",
      message,
      stack,
      ...context,
      timestamp: new Date().toISOString(),
    })
  );
}
