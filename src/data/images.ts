// Image slots used across the site.
//
// To add a real photo: put the file in /public/images/ and set `src`
// (for example '/images/hero.jpg'). Write `alt` to describe the photo.
// While `src` is empty, a flat placeholder block shows `label` instead.

export interface ImageSlot {
  src: string;
  alt: string;
  label: string; // visible on the placeholder until a real photo is added
}

export const images = {
  homeHero: {
    src: '',
    alt: 'Children at an R Journey activity',
    label: 'Photo: children at an R Journey activity',
  },
  // Three diamond photos in the home page "Want to join in?" band.
  joinDiamonds: [
    { src: '', alt: 'Children at STEM Builders Camp', label: 'Photo: STEM Builders Camp' },
    { src: '', alt: 'Bouquets from the Flower Sale', label: 'Photo: Flower Sale' },
    { src: '', alt: 'Children at Badminton Camp', label: 'Photo: Badminton Camp' },
  ],
} satisfies Record<string, ImageSlot | ImageSlot[]>;
