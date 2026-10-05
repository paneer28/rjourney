# R Journey website

The website for R Journey, a nonprofit in Apex, North Carolina, that runs hands-on programs for children and teens with Autism Spectrum Disorder (ASD).

Pages: Home, About, Our programs, Contact, Donate, People, The bigger picture, Partner on a program, and Corporate partnerships. Built with [Astro](https://astro.build) as a static site. Plain CSS, no UI framework, no analytics, no cookies, no third-party scripts. Fonts (Anton and Figtree) are self-hosted from the `@fontsource` packages.

## Running the site

You need [Node.js](https://nodejs.org) 22.12 or later.

```sh
npm install        # once, to install dependencies
npm run dev        # local preview at http://localhost:4321, reloads as you edit
npm run build      # builds the finished site into dist/
npm run preview    # serves the built dist/ folder locally
```

**Hosting:** GitHub Pages. Every push to `main` builds and deploys the site through the workflow in `.github/workflows/astro.yml`. (`public/_redirects` and `.node-version` are there in case the site moves to Cloudflare Pages.)

## Where to edit text

Text lives in data files, so you can change it without touching layout.

| File | What's in it |
|---|---|
| `src/data/site.ts` | Name, tagline, phone, email, Instagram, mailing address, donate URL, logo, and the legal status line |
| `src/data/programs.ts` | The programs: names, Our programs page paragraphs, photos, and which list and time group each one is in (see below). Also the three home page cards and the "assumption" words on them |
| `src/data/menu.ts` | The site menu's sections and pages (see below) |
| `src/data/statistics.ts` | The figures and sources on The bigger picture page (see below) |
| `src/data/team.ts` | Leadership team (name, short description, photo) and board of directors (name, photo) |
| `src/data/images.ts` | Photo slots that aren't tied to a program or person (home page hero and the three diamond photos) |
| `src/pages/*.astro` | Page-specific copy (headings and paragraphs for each page) |

**The legal status line** is in `site.ts` as `statusLine`. Every page reads it from there. Do not describe donations as tax-deductible until the IRS approves the 501(c)(3) application.

**The email address** in `site.ts` is a placeholder (marked `TODO`). Confirm it before launch.

## Editing programs

Each program in `src/data/programs.ts` has two fields that decide where it appears on the Our programs page (`/programs`):

| Field | Values | Effect |
|---|---|---|
| `kind` | `'own'` or `'partner'` | Which list it's in: **Run by us** or **With partners** |
| `status` | `'past'`, `'now'`, or `'planned'` | Which group it's in: **Past**, **Now**, or **Coming soon** |

- **Moving a program along:** change its `status`. When a planned program starts, set it to `'now'`; when it ends, `'past'`. Its button changes with it: "Ask about the next one" (past), "Call or text (858) 610-9661" (now), "Tell us you're interested" (coming soon).
- **Order:** within a group, programs appear in the order they're listed in the file.
- **Empty groups** don't appear at all.
- **Photos:** past and now programs show a photo beside a color panel, so give them an `image` and a `panelColor`. Coming soon programs show no photo.
- **The "running now" marker** (a small yellow square on the switch) appears automatically on any list with a `'now'` program.
- **Links:** each program's `id` is its link, for example `/programs#badminton-camp`. A link to a program in the other list switches to that list. `/programs?view=partners` opens the partners list. The old address, `/activities`, forwards to `/programs` (anchors included).
- **Home page cards:** `homeCards` near the bottom of the file lists the three programs shown on the home page, in order. Each one needs a `cardColor` and a `cardSummary`.

## Editing the menu

The Menu button opens a full-screen menu built from `src/data/menu.ts`.

- **Add a page to a section:** add `{ label: 'Page name', href: '/page-path' }` to that section's `items`.
- **Add a section:** add an entry with an `id` (lowercase with hyphens, e.g. `'latest-news'`), a `label`, and its `items`.

The `/menu` page lists the same pages; it's where the Menu button goes when JavaScript is off. The menu lays itself out from this list: on wide screens the items fill the right column in equal tiles, and on phones each section opens in place. The section containing the current page opens first, and the current page is underlined.

## Updating the statistics

The figures on The bigger picture page (`/why-we-exist/the-bigger-picture`) live in `src/data/statistics.ts`. Each one has:

- `figure`: shown large, exactly as written (e.g. `'1 in 31'`)
- `text`: the line beneath it
- `source` and `url`: listed under the figures as a linked source line

When a new report is published, update all four together, and only use figures from a published source. The figures always show their final values; nothing counts up.

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

## The Donate page and the donate URL

Every Donate link on the site (header, menu, footer, and buttons) goes to the Donate page, `/donate`. It's one screen with no scrolling: a pink panel in the middle, framed by blocks in the site's colors.

What its main button does depends on `donateUrl` in `src/data/site.ts`:

```ts
donateUrl: 'https://example.org/donate',
```

- **While it's empty:** the page asks visitors to call or text, with the "Call or text" button.
- **Once it's set:** a Donate button opens that URL in a new tab.

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

**One approved exception: the scroll reveal on the Our programs page.** The owner approved this deliberately. As a visitor scrolls down a program list, each connecting line draws downward and the next label or program fades in when the line reaches it. The exception is narrow, so don't remove it or extend it by mistake:

- It applies **only** to the two program lists on the Our programs page, and **only** in Standard and Vivid. Calm shows everything from the start, and nothing moves.
- It must never leave content hidden. Everything shows with JavaScript off, in Calm (including switching to Calm mid-page), in print, when keyboard focus reaches a hidden program, when arriving at a program's link, and after jumping down the page.
- Do not add scroll effects anywhere else on the site.

It lives in `src/components/ProgramLists.astro` (see the comment above its inline script), with its timings in `tokens.css` (`--reveal-line`, `--reveal-dur`, `--reveal-settle`, `--reveal-end-dur`).

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

- **Layout:** `Header`, `Footer`, `SiteMenu` (the full-screen menu), `DisplayPanel`, `DisplayButton`, `DisplayHint`
- **Buttons:** `Button`, `DonateButton`, `CallOrText` (the "Call or text" button plus a "Send a text" link; there's no sign-up form)
- **Sections:** `Band` (full-width color section), `PageHeading`, `Hero`, `IntroBand` (two columns), `StoryBlock`, `Panel`, `CtaStrip`, `DiamondBand`
- **Other:** `ClearingCards` (home page program cards), `ProgramLists` (the Our programs page switch and lists), `PersonCard`, `Placeholder` (image slot)

## Accessibility

The site meets WCAG 2.2 AA in all three modes. When you change something, check:

- **Contrast:** text on yellow, orange, and white is always black. On pink, body text is black and only large headlines may be white. Text on black is white.
- **Keyboard:** everything works with Tab, Enter, and the arrow keys (in the Display panel), with a visible focus outline. There's a "Skip to content" link.
- **Headings:** one `<h1>` per page, and headings in order.
- **Wording:** on first mention in each section write "children with ASD"; after that, "neurodivergent children" (or teens, or young people). Spell out "Autism Spectrum Disorder (ASD)" once per page, at the first mention. Never use "special needs", "high-functioning", "low-functioning", or "suffering from".
