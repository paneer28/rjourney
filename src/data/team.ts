// Leadership team and board of directors, shown on the About page.
// To add a photo, set `photo.src` (see images.ts). If `photo.alt` is left
// empty, the person's name is used as the alt text.

import type { ImageSlot } from './images';

export interface Person {
  name: string;
  description?: string; // leadership only, two or three sentences
  photo: ImageSlot;
}

const placeholderPhoto = (): ImageSlot => ({ src: '', alt: '', label: 'Photo to come' });

export const leadership: Person[] = [
  { name: 'Saritha Ravella, MD', description: 'Short description to come.', photo: placeholderPhoto() },
  { name: 'Praneeth Pendeyala', description: 'Short description to come.', photo: placeholderPhoto() },
];

export const board: Person[] = [
  { name: 'Saritha Ravella', photo: placeholderPhoto() },
  { name: 'Roopa Dantaluri', photo: placeholderPhoto() },
  { name: 'Anita Ravella', photo: placeholderPhoto() },
];
