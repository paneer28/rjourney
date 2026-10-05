# R Journey website

The website for R Journey, a nonprofit in Apex, North Carolina, that runs hands-on activities for children and teens with Autism Spectrum Disorder (ASD).

Four pages (Home, About, Activities, Contact), built with [Astro](https://astro.build) as a static site. Plain CSS, no UI framework, no analytics, no cookies, no third-party scripts. Fonts (Anton and Figtree) are self-hosted from the `@fontsource` packages.

## Running the site

You need [Node.js](https://nodejs.org) 22.12 or later.

```sh
npm install        # once, to install dependencies
npm run dev        # local preview at http://localhost:4321, reloads as you edit
npm run build      # builds the finished site into dist/
npm run preview    # serves the built dist/ folder locally
```

**Hosting:** Cloudflare Pages, deployed from the GitHub repo. Build command `npm run build`, output directory `dist`. The `.node-version` file tells Cloudflare to build with Node 22.

## Where to edit text

Text lives in data files, so you can change it without touching layout.

| File | What's in it |
|---|---|
| `src/data/site.ts` | Name, tagline, phone, email, Instagram, mailing address, donate URL, logo, and the legal status line |
| `src/data/activities.ts` | The three activities: names, home page card sentences, Activities page paragraphs, photos. Also the list of "assumption" words on the home page cards |
| `src/data/team.ts` | Leadership team (name, short description, photo) and board of directors (name, photo) |
| `src/data/images.ts` | Photo slots that aren't tied to an activity or person (home page hero and the three diamond photos) |
| `src/pages/*.astro` | Page-specific copy (headings and paragraphs for each page) |

**The legal status line** is in `site.ts` as `statusLine`. Every page reads it from there. Do not describe donations as tax-deductible until the IRS approves the 501(c)(3) application.

**The email address** in `site.ts` is a placeholder (marked `TODO`). Confirm it before launch.

## Adding a photo

Every photo slot has a `src`, `alt`, and `label`. While `src` is empty, the site shows a flat gray placeholder with the `label` text on it.

1. Put the image in `public/images/`, for example `public/images/badminton.jpg`.
2. Find its slot in the data file and set `src` to the path from `public/`:

   ```ts
   image: {
     src: '/images/badminton.jpg',
     alt: 'Two children practicing serves on a badminton court',
     label: 'Photo: Badminton Camp',
   },
   ```
3. Write `alt` to describe what's actually in the photo.

Photos are cropped to fit their slot, so nothing on the page shifts when they load. Landscape photos around 1600px wide work well.

**People:** in `team.ts`, set each person's `photo.src`. If you leave `photo.alt` empty, the person's name is used.

**Logo:** put the logo in `public/images/` and set `logo` in `site.ts` (for example `'/images/logo.svg'`). It replaces the "R Journey" text in the header and sits on a white block.

## Setting the donate URL

In `src/data/site.ts`, set `donateUrl` to the giving page, for example:

```ts
donateUrl: 'https://example.org/donate',
```

Every Donate button on the site uses this one setting (through the `DonateButton` component):

- **While it's empty:** Donate buttons link to the "Make a donation" section of the Contact page, and that section shows a "Call or text" button instead.
- **Once it's set:** every Donate button opens that URL in a new tab, including the one on the Contact page.

**Mailing address:** set `mailingAddress` in `site.ts`, and it appears automatically in the footer and as a "Mail" block on the Contact page.

## How the display modes work

Visitors can choose how the site looks and moves with the **Display** button in the header (or "Display settings" in the footer):

| | Calm | Standard | Vivid |
|---|---|---|---|
| Color | Muted, matte, soft off-white | The main palette | Same hues, more saturated |
| Motion | None | Gentle (200 to 300ms) | Fuller (up to 400ms), scaling and sliding |
| Layout | One column, larger text, no overlaps or decoration | As designed | As designed |

How it fits together:

- **One attribute** on `<html>` holds the mode: `data-mode="calm"`, `"standard"`, or `"vivid"`.
- **`src/styles/tokens.css`** defines every color, size, spacing, and timing value once per mode. Components only use these tokens and never hard-code a color or duration. To change how a mode looks, change its tokens.
- **A small script in `<head>`** (in `src/layouts/BaseLayout.astro`) applies the saved choice before the page appears, so it never flashes the wrong mode. With no saved choice, a visitor whose device is set to reduce motion starts in Calm; everyone else starts in Standard. Vivid is only ever chosen by the visitor.
- **The panel** is `src/components/DisplayPanel.astro`. The choice is saved in the browser (`localStorage`) and applies on every page.
- **With JavaScript off,** the site shows Standard, the Display button is hidden, and if the device asks for reduced motion all transitions are removed.

**Rules for anything new:** nothing moves unless the visitor hovers, focuses, taps, or clicks. No scroll animations, nothing that flashes, loops, auto-advances, or plays sound. Every hover effect also needs a keyboard-focus version and a tap version. Use the motion tokens (`--dur`, `--dur-slow`, and so on) for every transition, so Calm can turn it off.

### Some useful tokens

| Token | What it controls |
|---|---|
| `--yellow`, `--pink`, `--orange`, `--black`, `--paper`, `--white` | The palette (remapped in Calm and Vivid) |
| `--ink`, `--on-black`, `--on-pink-heading` | Text colors that keep WCAG AA contrast on each background |
| `--dur-fast`, `--dur`, `--dur-slow` | Transition lengths (all `0ms` in Calm) |
| `--hover-scale`, `--arrow-shift`, `--button-lift` | Vivid's extra movement |
| `--stagger`, `--overlap`, `--story-shift`, `--decoration` | Overlaps and decoration (all off in Calm) |
| `--clutter-opacity` | How faint the words on the home page cards are |

## Components

All in `src/components/`:

- **Layout:** `Header`, `Footer`, `DisplayPanel`, `DisplayButton`, `DisplayHint`
- **Buttons:** `Button`, `DonateButton`, `CallOrText` (the "Call or text" button plus a "Send a text" link; there's no sign-up form)
- **Sections:** `Band` (full-width color section), `PageHeading`, `Hero`, `IntroBand` (two columns), `StoryBlock`, `Panel`, `CtaStrip`, `DiamondBand`
- **Other:** `ClearingCards` (home page activity cards), `PersonCard`, `Placeholder` (image slot)

## Accessibility

The site meets WCAG 2.2 AA in all three modes. When you change something, check:

- **Contrast:** text on yellow, orange, and white is always black. On pink, body text is black and only large headlines may be white. Text on black is white.
- **Keyboard:** everything works with Tab, Enter, and the arrow keys (in the Display panel), with a visible focus outline. There's a "Skip to content" link.
- **Headings:** one `<h1>` per page, and headings in order.
- **Wording:** on first mention in each section write "children with ASD"; after that, "neurodivergent children" (or teens, or young people). Spell out "Autism Spectrum Disorder (ASD)" once per page, at the first mention. Never use "special needs", "high-functioning", "low-functioning", or "suffering from".
