// Leadership team and board of directors.
// These are placeholders. Replace them with real names, titles,
// descriptions, and photos. Do not invent people.

import type { ImageSlot } from './images';

export interface Person {
  name: string;
  title?: string; // leadership only
  description?: string; // leadership only, two or three sentences
  photo: ImageSlot;
}

const placeholderPhoto = (): ImageSlot => ({ src: '', alt: '', label: 'Photo to come' });

export const leadership: Person[] = [
  { name: 'Name', title: 'Title', description: 'Short description to come.', photo: placeholderPhoto() },
  { name: 'Name', title: 'Title', description: 'Short description to come.', photo: placeholderPhoto() },
  { name: 'Name', title: 'Title', description: 'Short description to come.', photo: placeholderPhoto() },
];

export const board: Person[] = [
  { name: 'Name', photo: placeholderPhoto() },
  { name: 'Name', photo: placeholderPhoto() },
  { name: 'Name', photo: placeholderPhoto() },
];
