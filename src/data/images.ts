// Image slots used across the site.
//
// To add a real photo: put the file in /public/images/ and set `src`
// (for example '/images/hero.jpg'). Write `alt` to describe the photo.
// While `src` is empty, a flat placeholder block shows `label` instead.
//
// Photos are cropped to fit their slot. If the crop cuts off something
// important, set `position` to choose which part stays in view, as a CSS
// object-position: 'center 20%' keeps the upper part, 'center 80%' the lower.
//
// `zoom` enlarges a photo within its slot (e.g. 1.3 for 30% closer), toward the
// middle of the slot, or toward `zoomOrigin` if set. A zoomOrigin low in the
// slot (e.g. 'center 90%') pushes the picture up; high (e.g. 'center 10%') down.
// The photo always still fills the slot.
//
// Diamond photos are also zoomed in to fill the diamond. `focus` sets the
// point they zoom toward (default '50% 50%', the center). Lower the first
// number to move the subject right inside the diamond, raise it to move it left.

export interface ImageSlot {
  src: string;
  alt: string;
  label: string; // visible on the placeholder until a real photo is added
  position?: string; // optional focus point for cropping, e.g. 'center 20%'
  focus?: string; // diamond photos only: the point the zoom centers on, e.g. '40% 50%'
  zoom?: number; // optional: enlarge the photo within its slot, e.g. 1.3
  zoomOrigin?: string; // optional: the point in the slot the zoom grows from, e.g. 'center 90%'
}

export const images = {
  homeHero: {
    src: '/images/badminton-camp.jpg',
    alt: 'Three players on an indoor badminton court look up at the shuttlecock after a hit.',
    label: 'Photo: children at an R Journey program',
    position: 'center 18%', // keeps the players' faces in view in the wide crop
  },
  // Three diamond photos in the home page "Want to join in?" band.
  joinDiamonds: [
    {
      src: '/images/stem-builders.png',
      alt: 'Two young people at a laptop, one pointing to blocks of code on the screen.',
      label: 'Photo: STEM Builders Camp',
      position: '81% center', // shifts the picture left about a quarter of the diamond
    },
    {
      src: '/images/flower-pic-2.jpg',
      alt: 'A bouquet of pink and coral dahlias in a glass mason jar tied with twine.',
      label: 'Photo: Nurture with Love',
      position: 'center 40%', // keeps the bouquet and jar in view vertically
      focus: '40% 50%', // the bouquet sits left of center in the photo; this centers it in the diamond
    },
    {
      src: '/images/badminton-pic-2.jpg',
      alt: 'Players weave through a line of orange cones on an indoor badminton court during a warm-up.',
      label: 'Photo: Badminton Camp',
      position: 'center 55%', // centers the players in the diamond
    },
  ],
} satisfies Record<string, ImageSlot | ImageSlot[]>;
