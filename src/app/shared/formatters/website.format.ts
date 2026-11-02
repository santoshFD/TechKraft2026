const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/** True when value is empty or a valid http(s) URL (scheme optional). */
export function isValidWebsiteUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }

  try {
    const url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
      return false;
    }
    const host = url.hostname;
    if (!host) {
      return false;
    }
    if (host === 'localhost') {
      return true;
    }
    return host.includes('.');
  } catch {
    return false;
  }
}
