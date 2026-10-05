// Read a duration token from tokens.css (e.g. --menu-fade), in milliseconds.
// The build's CSS minifier may rewrite "120ms" as ".12s", so both units are handled.
export function durationMs(token: string): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const number = parseFloat(value) || 0;
  return value.endsWith('ms') ? number : value.endsWith('s') ? number * 1000 : number;
}
