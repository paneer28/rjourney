// Shared names for the display control. The inline <head> script in
// BaseLayout.astro receives these through define:vars, so keep them here only.

export const MODES = ['calm', 'standard', 'vivid'] as const;
export type Mode = (typeof MODES)[number];

// localStorage key that holds the visitor's chosen mode.
export const MODE_KEY = 'rj-display-mode';

// localStorage key set after the first page view, so the
// "You can make this site calmer or more vivid" line shows only once.
export const HINT_KEY = 'rj-display-hint-seen';
