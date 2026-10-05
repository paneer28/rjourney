// The programs R Journey runs. Only list programs the organization actually
// runs or has actually planned.
//
// Two fields decide where each one appears on the Our programs page (/programs):
//   kind:   'own'      → the "Run by us" list
//           'partner'  → the "With partners" list
//   status: 'past'     → under "Past"
//           'now'      → under "Now"
//           'planned'  → under "Coming soon" (shown with no photo)
// Within each group, programs appear in the order they're listed here.

import type { ImageSlot } from './images';

export type ProgramKind = 'own' | 'partner';
export type ProgramStatus = 'past' | 'now' | 'planned';

export interface Program {
  id: string; // anchor on the Our programs page, e.g. /programs#stem-builders-camp
  name: string;
  kind: ProgramKind;
  status: ProgramStatus;
  paragraphs: string[]; // Our programs page text
  image?: ImageSlot; // past and now programs (planned ones show no photo)
  panelColor?: 'yellow' | 'orange' | 'pink'; // past and now programs
  // Home page clearing card (only for programs in `homeCards` below):
  cardColor?: 'yellow' | 'orange';
  cardSummary?: string; // one sentence
}

// TODO: confirm with owner: each program's `kind` and `status`.
export const programs: Program[] = [
  {
    id: 'nurture-with-love',
    name: 'Nurture with Love',
    kind: 'own',
    status: 'past',
    cardColor: 'orange',
    cardSummary: 'Children and teens with ASD arrange bouquets by hand, then help sell them.',
    panelColor: 'orange',
    image: {
      src: '',
      alt: 'Bouquets from Nurture with Love',
      label: 'Photo: bouquets from Nurture with Love',
    },
    paragraphs: [
      'Children and teens with ASD who are curious about floristry arrange fresh bouquets by hand. Then the bouquets go on sale, and the young florists help sell them.',
      'Arranging flowers builds fine motor skills. Selling them gives neurodivergent young people practice talking with customers. Every bouquet sold pays for more R Journey programs.',
    ],
  },
  {
    id: 'buddy-program',
    name: 'Buddy Program',
    kind: 'own',
    status: 'planned',
    paragraphs: [
      'Teens with ASD will be paired with a neurotypical teen to shadow or help out at a real workplace, chosen around what each neurodivergent teen is interested in. A teen who loves flowers, for example, could spend time in a flower shop.',
      'Both buddies get something from it: early job skills, more responsibility, and a new friend. We plan to make the Buddy Program free to join.',
    ],
  },
  {
    id: 'stem-builders-camp',
    name: 'STEM Builders Camp',
    kind: 'partner',
    status: 'now',
    cardColor: 'yellow',
    cardSummary: 'Children with ASD learn the basics of coding, one step at a time.',
    panelColor: 'yellow',
    image: {
      src: '',
      alt: 'Children at STEM Builders Camp',
      label: 'Photo: STEM Builders Camp',
    },
    paragraphs: [
      'Children with ASD learn the basics of coding: how to give a computer clear instructions and see what it does with them.',
      'We run the camp with STEM Leaders, whose coaches teach the sessions. For neurodivergent children who enjoy patterns, logic, and building things, it is an early look at skills that can lead to real work later on.',
    ],
  },
  {
    id: 'badminton-camp',
    name: 'Badminton Camp',
    kind: 'partner',
    status: 'now',
    cardColor: 'yellow',
    cardSummary: 'Children with ASD learn to play badminton with volunteer coaches.',
    panelColor: 'yellow',
    image: {
      src: '',
      alt: 'Children at Badminton Camp',
      label: 'Photo: Badminton Camp',
    },
    paragraphs: [
      'Children with ASD learn badminton from the very first serve. Volunteers from R Journey and Rookie Rackets, a fellow nonprofit, coach together, and Peak Sports in Morrisville donates the court time.',
      'Badminton is good for coordination, and it gives neurodivergent children a way into a sport at their own pace.',
    ],
  },
  {
    id: 'violin-program',
    name: 'Violin Program',
    kind: 'partner',
    status: 'planned',
    paragraphs: [
      'A violin program for children and teens with ASD is on the way, hosted at Peak Sports in Morrisville.',
      "We're still working out the details. If your neurodivergent child would like to try the violin, tell us and we'll let you know when it starts.",
    ],
  },
];

// The three cards on the home page, in display order (colors alternate
// yellow, orange, yellow). Each needs `cardColor` and `cardSummary`.
export const homeCards: Program[] = ['stem-builders-camp', 'nurture-with-love', 'badminton-camp'].map((id) => {
  const program = programs.find((p) => p.id === id);
  if (!program) throw new Error(`homeCards: no program with id "${id}"`);
  return program;
});

// The Our programs page lists and their time groups, in display order.
export const kinds: { kind: ProgramKind; label: string; view: string }[] = [
  { kind: 'own', label: 'Run by us', view: 'own' }, // the default list
  { kind: 'partner', label: 'With partners', view: 'partners' }, // ?view=partners
];

export const statuses: { status: ProgramStatus; label: string }[] = [
  { status: 'past', label: 'Past' },
  { status: 'now', label: 'Now' },
  { status: 'planned', label: 'Coming soon' },
];

// Faint fragments of common assumptions shown over the home page cards
// at rest, then cleared on hover, focus, or tap. Decorative only.
export const clutterFragments = [
  'just shy',
  'will grow out of it',
  'not listening',
  'too picky',
  'just a phase',
  'not trying',
];
