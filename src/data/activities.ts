// The three activities R Journey runs. Do not add others here
// unless the organization actually runs them.

import type { ImageSlot } from './images';

export interface Activity {
  id: string; // anchor on the Activities page, e.g. /activities#stem-builders-camp
  name: string;
  cardColor: 'yellow' | 'orange'; // home page clearing card
  cardSummary: string; // one sentence for the home page card
  panelColor: 'yellow' | 'orange' | 'pink'; // Activities page story block
  image: ImageSlot;
  paragraphs: string[]; // Activities page story block text
}

export const activities: Activity[] = [
  {
    id: 'stem-builders-camp',
    name: 'STEM Builders Camp',
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
    id: 'flower-sale',
    name: 'Flower Sale',
    cardColor: 'orange',
    cardSummary: 'Children and teens with ASD arrange bouquets by hand, then help sell them.',
    panelColor: 'orange',
    image: {
      src: '',
      alt: 'Bouquets from the Flower Sale',
      label: 'Photo: bouquets from the Flower Sale',
    },
    paragraphs: [
      'Children and teens with ASD who are curious about floristry arrange fresh bouquets by hand. Then the bouquets go on sale, and the young florists help sell them.',
      'Arranging flowers builds fine motor skills. Selling them gives neurodivergent young people practice talking with customers. Every bouquet sold pays for more R Journey activities.',
    ],
  },
  {
    id: 'badminton-camp',
    name: 'Badminton Camp',
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
