// Reopens the Badminton Camp sign-up form for the next Sunday class.
// Run weekly by .github/workflows/badminton-weekly.yml, after Sunday's class.
//
// Each run works out which Sunday the form should be for (the first one whose
// 7 PM reset hasn't happened yet, and never before the first class), and if
// the form still shows an earlier date it:
//   - changes the date in the form's "Class date:" text to the new Sunday, and
//   - sets the response limit to (sign-ups so far + 6), giving 6 fresh spots.
// If the form already shows that date, it does nothing, so extra runs are harmless.
//
// Needs TALLY_API_KEY. Set DRY_RUN=1 to print the changes without making them.
import { readFileSync } from 'node:fs';

const SPOTS = 6;
const FIRST_CLASS = '2026-10-25';
const RESET_HOUR = 19; // 7 PM in Raleigh, after class
const TZ = 'America/New_York';
const DATE = /^Sunday, [A-Z][a-z]+ \d{1,2}, \d{4}$/; // the text after "Class date:" on the form

const formId = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8').match(/badminton: '(\w+)'/)?.[1];
const apiKey = process.env.TALLY_API_KEY;
const dryRun = Boolean(process.env.DRY_RUN);
if (!formId || formId === 'TODO') throw new Error('No badminton form id in src/data/site.ts');
if (!apiKey && !dryRun) throw new Error('TALLY_API_KEY is not set');

// Today's date and hour in Raleigh, as plain numbers.
const parts = Object.fromEntries(
  new Intl.DateTimeFormat('en-US', { timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hourCycle: 'h23' })
    .formatToParts(new Date())
    .map((p) => [p.type, Number(p.value)]),
);
const today = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
let next = new Date(today);
next.setUTCDate(next.getUTCDate() + ((7 - today.getUTCDay()) % 7)); // this Sunday, or today if Sunday
if (next.getTime() === today.getTime() && parts.hour >= RESET_HOUR) next.setUTCDate(next.getUTCDate() + 7);
if (next < new Date(FIRST_CLASS)) next = new Date(FIRST_CLASS);
const label = next.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

const api = async (method, body) => {
  const res = await fetch(`https://api.tally.so/forms/${formId}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Tally ${method} failed: ${res.status} ${await res.text()}`);
  return res.json();
};

if (dryRun && !apiKey) {
  console.log(`Form should be for: ${label}`);
  process.exit(0);
}

const form = await api('GET');
// The date is its own text segment in the block that starts "Class date:".
const segments = form.blocks.find((b) => b.payload?.safeHTMLSchema?.[0]?.[0]?.startsWith('Class date:'))?.payload.safeHTMLSchema;
const segment = segments?.find((seg) => DATE.test(seg[0].trim()));
if (!segment) throw new Error('No "Class date: Sunday, <Month> <day>, <year>" text found on the form');
if (segment[0].trim() === label) {
  console.log(`Already set for ${label}; nothing to do.`);
  process.exit(0);
}

const limit = form.numberOfSubmissions + SPOTS;
segment[0] = label;
console.log(`Changing the form to ${label}, with the limit raised to ${limit} (${form.numberOfSubmissions} sign-ups so far + ${SPOTS}).`);
if (dryRun) process.exit(0);
await api('PATCH', { blocks: form.blocks, settings: { submissionsLimit: limit } });
console.log('Done.');
