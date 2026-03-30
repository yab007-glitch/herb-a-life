const requestLog = new Map<string, number[]>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, timestamps] of requestLog) {
    const valid = timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      requestLog.delete(key);
    } else {
      requestLog.set(key, valid);
    }
  }
}

export function rateLimit(
  ip: string,
  limit: number = 20,
  windowMs: number = 60_000
): { success: boolean; remaining: number } {
  cleanup(windowMs);
  const now = Date.now();
  const timestamps = requestLog.get(ip) ?? [];
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= limit) {
    return { success: false, remaining: 0 };
  }

  valid.push(now);
  requestLog.set(ip, valid);
  return { success: true, remaining: limit - valid.length };
}
