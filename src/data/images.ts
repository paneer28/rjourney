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
      src: '/images/stem-builders.jpg',
      alt: 'Two young people at a laptop, one pointing to blocks of code on the screen.',
      label: 'Photo: STEM Builders Camp',
      position: '81% center', // shifts the picture left about a quarter of the diamond
    },
    {
      src: '/images/dahlia-close.jpg',
      alt: "A close view of a magenta dahlia among baby's breath.",
      label: 'Photo: Nurture with Love',
      position: 'center 75%', // the open dahlia in the lower part of the photo
    },
    {
      src: '/images/badminton-balloon-drill.jpg',
      alt: 'Children practice hitting balloons with badminton rackets on an indoor court.',
      label: 'Photo: Badminton Camp',
      position: '40% center', // keeps the players in the diamond
    },
  ],
} satisfies Record<string, ImageSlot | ImageSlot[]>;

// Every real photo on the site, by subject, for the inner pages' headers and
// cards. The same files as above and in programs.ts, with crops for these slots.
export const photos = {
  badmintonCourt: {
    src: '/images/badminton-camp.jpg',
    alt: 'Three players on an indoor badminton court look up at the shuttlecock after a hit.',
    label: 'Photo: Badminton Camp',
    position: 'center 25%',
  },
  badmintonCoach: {
    src: '/images/badminton-camp-3.jpg',
    alt: 'A coach and a young player in a red shirt on a badminton court, with shuttlecocks scattered around them.',
    label: 'Photo: Badminton Camp',
    position: 'center 55%',
  },
  badmintonWarmup: {
    src: '/images/badminton-pic-2.jpg',
    alt: 'Players weave through a line of orange cones on an indoor badminton court during a warm-up.',
    label: 'Photo: Badminton Camp',
    position: 'center 55%',
  },
  bouquetJar: {
    src: '/images/flower-pic-2.jpg',
    alt: 'A bouquet of pink and coral dahlias in a glass mason jar tied with twine.',
    label: 'Photo: Nurture with Love',
    position: 'center 40%',
  },
  bouquets: {
    src: '/images/flower-sale-bouquets.jpg',
    alt: "Three bouquets of dahlias and baby's breath in glass jars tied with twine.",
    label: 'Photo: Nurture with Love',
    position: 'center 70%',
  },
  coding: {
    src: '/images/stem-builders.jpg',
    alt: 'Two young people at a laptop, one pointing to blocks of code on the screen.',
    label: 'Photo: STEM Builders Camp',
    position: '70% center',
  },
  balloonDrill: {
    src: '/images/badminton-balloon-drill.jpg',
    alt: 'Children practice hitting balloons with badminton rackets on an indoor court, with cones and a coach nearby.',
    label: 'Photo: Badminton Camp',
    position: 'center 40%',
  },
  coachBalloon: {
    src: '/images/badminton-coach-balloon.jpg',
    alt: 'A coach in a yellow shirt watches a young player reach up to hit a green balloon with a racket.',
    label: 'Photo: Badminton Camp',
    position: 'center 45%',
  },
  group: {
    src: '/images/badminton-group.jpg',
    alt: 'Children and volunteer coaches with rackets spread across an indoor badminton court.',
    label: 'Photo: Badminton Camp',
    position: 'center 55%',
  },
  ladder: {
    src: '/images/badminton-ladder.jpg',
    alt: 'A young player steps through an agility ladder on a badminton court while others wait their turn.',
    label: 'Photo: Badminton Camp',
    position: 'center 55%',
  },
  rally: {
    src: '/images/badminton-rally.jpg',
    alt: 'Players tap balloons back and forth with rackets while a parent watches from the side of the court.',
    label: 'Photo: Badminton Camp',
    position: 'center 55%',
  },
  shuttles: {
    src: '/images/badminton-shuttles.jpg',
    alt: 'A young player in a red shirt stands among scattered shuttlecocks as a volunteer coach looks on.',
    label: 'Photo: Badminton Camp',
    position: 'center 60%',
  },
  courtWide: {
    src: '/images/badminton-wide.jpg',
    alt: 'A wide view of a badminton session: players, coaches, a net, and balloons on a green court.',
    label: 'Photo: Badminton Camp',
    position: 'center 60%',
  },
  celosia: {
    src: '/images/bouquet-celosia.jpg',
    alt: 'A full bouquet of magenta and coral celosia in a green ceramic bowl.',
    label: 'Photo: Nurture with Love',
    position: 'center 45%',
  },
  inHand: {
    src: '/images/bouquet-in-hand.jpg',
    alt: "A hand steadies a mason jar holding deep red dahlias and baby's breath.",
    label: 'Photo: Nurture with Love',
    position: 'center 60%',
  },
  saleTable: {
    src: '/images/bouquet-sale-table.jpg',
    alt: 'A long table lined with small bouquets of dahlias in glass jars.',
    label: 'Photo: Nurture with Love',
    position: 'center 70%',
  },
  threeJars: {
    src: '/images/bouquets-three-jars.jpg',
    alt: "Three mason jars of dahlias and baby's breath on a table by a window.",
    label: 'Photo: Nurture with Love',
    position: 'center 55%',
  },
  dahlia: {
    src: '/images/dahlia-close.jpg',
    alt: "A close view of a magenta dahlia among baby's breath.",
    label: 'Photo: Nurture with Love',
    position: 'center 70%',
  },
} satisfies Record<string, ImageSlot>;
