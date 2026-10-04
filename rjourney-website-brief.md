# R Journey website: build brief

This brief is everything you need to build version one of the R Journey website. Read it all before writing code. Where it gives exact copy, use the copy as written. Where it leaves a choice open, pick the simpler option.

## 1. What this is and who it is for

R Journey is a small nonprofit in Apex, North Carolina, founded in 2025. It runs hands-on activities for children and teens with Autism Spectrum Disorder (ASD). It is replacing an older site that was a generic template full of services the organization does not offer.

Three groups will read the new site, in this order of importance:

1. **Parents** looking for an activity for their child. They need to see what R Journey does and how to sign up.
2. **Teens with ASD** looking for something to join. Many process light, color, and motion more intensely than other visitors, which is why the site has a display control (section 6).
3. **Neurotypical visitors and donors.** The site should show them what R Journey does and ask them to give.

The two actions the site drives are **signing up for an activity** (by calling or texting) and **donating**.

Version one is deliberately small: four pages, three activities, no backend. It will be extended later by the owner working with Claude Code, so favor code that is easy to read and change over code that is clever.

## 2. Facts the site must get right

The organization has an application for tax-exempt status pending and will ask for donations, so every claim on the site has to be true.

- **Name:** R Journey. Tagline: "Building Bright Futures Together".
- **Founded:** 2025. Based in Apex, North Carolina. Serves families in the Triangle region.
- **Legal status line (use this exact wording wherever status is mentioned):** "R Journey is a North Carolina nonprofit corporation. Our application for 501(c)(3) tax-exempt status is pending with the IRS."
- **Never say donations are tax-deductible.** That is not true until the IRS approves the application.
- **Activities:** exactly three. STEM Builders Camp, Flower Sale, Badminton Camp. Do not add others, and do not label anything "coming soon".
- **Partners:** STEM Leaders, Rookie Rackets, Peak Sports. Name them only on the Activities page, inside the relevant activity. Do not feature them on the home page.
- **No statistics, counters, testimonials, or success stories.** R Journey has no verified numbers yet.
- **No services beyond the three activities.** The old site listed counseling, respite care, a 24/7 hotline, job placement, tutoring, legal referrals, and more. None of that exists. Do not carry any of it over.

## 3. Technical approach

- **Framework:** Astro (latest stable), static output, no UI framework and no Tailwind. Plain CSS with custom properties, because the display modes in section 6 depend on design tokens.
- **Why Astro:** four pages share a header, footer, and display panel, and components keep those in one place. It ships plain HTML with almost no JavaScript.
- **Hosting:** Cloudflare Pages, deployed from a private GitHub repo. Build command `npm run build`, output directory `dist`.
- **JavaScript:** only for the display panel, the mobile menu, and tap behavior on the activity cards. The site must be fully readable with JavaScript off.
- **No analytics, cookies, or third-party scripts.** Self-host the fonts.
- **Content lives in data files,** so text can be edited without touching layout:
  - `src/data/site.ts`: name, tagline, phone, email, Instagram, mailing address, donate URL, status line.
  - `src/data/activities.ts`: the three activities.
  - `src/data/team.ts`: leadership team and board.
- **Styles:** `src/styles/tokens.css` holds every color, spacing, type, and motion value for all three display modes. Components read tokens and never hard-code a color or duration.

### Contact and donation settings (`site.ts`)

| Setting | Value |
|---|---|
| Phone | (858) 610-9661, used for both `tel:` and `sms:` links |
| Email | `rjourney@gmail.com` (placeholder; mark it with a `TODO` comment) |
| Instagram | `rjourneyorg` |
| Mailing address | empty for now; render the address row only when this is filled |
| Donate URL | empty for now |

**Donate buttons:** every Donate button reads the donate URL from `site.ts`. While it is empty, the buttons link to the Contact page. Once it is set, they open that URL in a new tab. Build this as one `DonateButton` component.

**Sign-up:** there is no form. Signing up means calling or texting the phone number. Every sign-up button is labeled "Call or text (858) 610-9661" and links to `tel:`; place a smaller "Send a text" link beside it that uses `sms:`.

### Images

Real photos and the logo file will be supplied later. Until then:

- Build a `Placeholder` component that renders a flat token-colored block at the correct aspect ratio with a short visible label describing the photo that belongs there (for example, "Photo: children at badminton camp").
- Every image slot takes its path and alt text from a data file, so swapping in a real photo is a one-line change.
- Use a text wordmark, "R Journey", where the logo will go. The real logo is a sky-blue puzzle piece with a yellow loop; it will sit on a white block in the header so it reads on any background.

## 4. Design language: Standard mode

The reference is the SolarAid charity website. Reproduce its design language, described below. Do not copy its text, images, logo, or name.

The overall character: loud, flat, and confident. Big blocks of solid color, heavy condensed headlines, square corners, and blocks that overlap each other like cut paper. No gradients, no rounded corners, no soft shadows.

### Color

| Token | Hex | Use |
|---|---|---|
| `--yellow` | `#F9DD4A` | Bands, panels, primary buttons on dark or pink backgrounds |
| `--pink` | `#DC418A` | Hero panel, call-to-action strips, button offset shadows |
| `--orange` | `#F08C35` | Alternate panels, footer strip, button offset shadows |
| `--black` | `#000000` | Dark bands, buttons, all text on light and colored backgrounds |
| `--paper` | `#F4F4F4` | Default page background |
| `--white` | `#FFFFFF` | Tiles, text on black |

Text color rules, which keep contrast at WCAG AA:

- On yellow and orange: black text only.
- On pink: black for body text. White is allowed only for large headlines.
- On black: white text.

### Typography

- **Display:** Anton (fallback: League Gothic, Impact, sans-serif). Heavy, condensed, set in capitals, tight line-height (1.0 to 1.05). Write headings in sentence case in the HTML and uppercase them with CSS, so Calm mode can turn the capitals off.
- **Body:** Figtree, weights 400 and 700 (fallback: system sans-serif). Body size 1.125rem to 1.25rem, line-height 1.6, maximum line length 60 characters.
- **Scale:** page and hero headings `clamp(2.5rem, 6vw, 4.5rem)`; section headings `clamp(2.25rem, 5vw, 4rem)`; card headings about 2rem.
- Headlines are short. Keep every headline to one or two lines at desktop width.

### Buttons

- Rectangular, no border radius, bold body font, generous padding.
- Label on the left and a long thin arrow on the right.
- A hard offset shadow, with no blur, sits 6px down and 6px to the left: `box-shadow: -6px 6px 0`.
- Two variants: black button with white text and a pink shadow (used on yellow, orange, white, and paper); yellow button with black text and an orange shadow (used on pink, black, and photos).
- Focus state: a 3px outline that is visible on every background.

### Layout patterns

Use these patterns. Each one appears in the reference.

- **Full-width color bands.** Sections run edge to edge in a solid color; content sits in a centered container about 1200px wide.
- **Hero with an overlapping panel.** A full-width photo fills the top of the page. A pink panel, about half the container width and centered, straddles the bottom edge of the photo, half over the photo and half over the section below. It holds the headline and buttons.
- **Two-column intro band.** A large headline in the left column; two short paragraphs and a button in the right column.
- **Story blocks.** A photo and a solid color panel side by side, equal height, touching with no gap. The panel holds a heading, a paragraph, and a button. Successive blocks alternate the photo between left and right and shift sideways so they do not line up, with a pale gray rectangle showing behind them.
- **Staggered card row.** Square cards side by side, alternately raised and lowered by about 60px, with edges overlapping slightly. The hovered card comes forward at full color.
- **Diamond photos on black.** Square photos rotated into diamonds with the points clipped flat, clustered at the left edge of a black band and bleeding off the page, with text on the right.
- **Call-to-action strip.** A pink bar, narrower than the container, with a headline on the left and a yellow button on the right in a single row.
- **Mosaic footer.** On a black background, a grid of solid blocks in different colors and sizes, separated by thin black gaps.

Section headings above a row of cards are centered. Everything else is left-aligned.

## 5. Site structure and copy

Four pages: Home (`/`), About (`/about`), Activities (`/activities`), Contact (`/contact`).

### Wording rule

On the first mention in each section, write "children with ASD" (or "children and teens with ASD"). After that, within the same section, write "neurodivergent children" (or "neurodivergent teens", "neurodivergent young people"). Spell out "Autism Spectrum Disorder (ASD)" once per page, at the first mention. Never use "special needs", "high-functioning", "low-functioning", or "suffering from".

The tone is warm and personal: a small local group talking to its neighbors. Plain words, short sentences, nothing institutional.

### Header (all pages)

- Left: the logo on a white block.
- Right: a row of joined blocks: nav links (Home, About, Activities, Contact) on white, then a pink **Donate** block, then an orange **Display** block (section 6).
- The header is not sticky. Over the home page hero it sits on top of the photo.
- On narrow screens the nav links collapse behind a "Menu" button; Donate and Display stay visible.
- Directly under the header, on a visitor's first visit only, show one quiet line of text: "You can make this site calmer or more vivid." It links to the Display panel. It is not a pop-up and has no close button to hunt for; it stops appearing once the visitor has chosen a mode or visited a second page.

### Footer (all pages)

A mosaic on black:

- Yellow block: heading "More about R Journey", with black buttons stacked beneath it for About, Activities, and Contact.
- White block: heading "Join an activity", with the "Call or text (858) 610-9661" button.
- Pink block: heading "Help us grow", with a Donate button.
- Orange strip: phone, email, Instagram link, mailing address (when set), a "Display settings" link that opens the Display panel, and this line: "© 2026 R Journey. R Journey is a North Carolina nonprofit corporation. Our application for 501(c)(3) tax-exempt status is pending with the IRS."

### Home

1. **Hero.** Photo placeholder: "Photo: children at an R Journey activity".
   - Headline: "A place to learn, play, and belong"
   - Line beneath: "Hands-on activities for children and teens with Autism Spectrum Disorder (ASD) in the Triangle."
   - Buttons: "See our activities" (links to `/activities`) and Donate.

2. **Intro band** (yellow, two columns).
   - Headline: "New, local, and here for your family"
   - Paragraph: "R Journey is a nonprofit in Apex, North Carolina, started in 2025. We run activities where children and teens with ASD can write their first lines of code, arrange a bouquet, or learn to play badminton."
   - Paragraph: "Each one gives neurodivergent young people a chance to build a skill, meet people, and have a good time doing it. We're a young organization, and we're growing one activity at a time."
   - Button: "About R Journey" (links to `/about`).

3. **Activities** (paper background). The clearing cards from section 7.
   - Heading: "What we do"
   - Caption: "Hover over a card, or tap it, to clear away the assumptions."
   - Three cards, each linking to its section on the Activities page:
     - **STEM Builders Camp.** "Children with ASD learn the basics of coding, one step at a time."
     - **Flower Sale.** "Children and teens with ASD arrange bouquets by hand, then help sell them."
     - **Badminton Camp.** "Children with ASD learn to play badminton with volunteer coaches."

4. **Join band** (black, diamond photos on the left; three placeholders).
   - Headline: "Want to join in?"
   - Paragraph: "Parents, call or text us. We'll tell you what's running now and help you choose an activity for your child with ASD."
   - Paragraph: "Teens, you're welcome to reach out yourself, or ask a parent to. If calling is hard, a text works just as well."
   - Button: "Call or text (858) 610-9661".

5. **Donate strip and closing band** (pink strip over a black band).
   - Headline: "Help us keep the activities running"
   - Paragraph: "Every gift goes toward activities for children and teens with ASD. You don't need a personal connection to autism to be part of this. You only need to think neurodivergent young people deserve the same chances as everyone else."
   - Small text: the legal status line from section 2.
   - Button: Donate.

### About

1. **Page heading:** "About R Journey" (yellow band).

2. **Mission** (two-column band).
   - Heading: "Why we exist"
   - Paragraph: "R Journey exists to improve the lives of children, teens, and young adults with Autism Spectrum Disorder (ASD), and the lives of their families."
   - Paragraph: "We do it through activities that build independence and inclusion. For neurodivergent young people, that can mean learning a skill, joining a team, or making something with their own hands."

3. **Vision** (pink band).
   - Heading: "What we're working toward"
   - Paragraph: "We want the Triangle to be a place where young people with ASD are welcomed and given real chances to grow, and where the families of neurodivergent children have people to lean on."

4. **Beliefs** (three panels in a row: yellow, orange, white).
   - Heading: "What we believe"
   - "Start with what a child loves." "An interest in flowers, computers, or sport is the best place to begin teaching a skill."
   - "Belonging comes from doing things together." "Children get to know each other by working side by side, so every activity is something to do, not something to watch."
   - "Families are part of it." "When a child has somewhere to go and something to look forward to, the whole family benefits."

5. **Our story** (paper background).
   - Heading: "Where we are now"
   - Paragraph: "R Journey began in Apex in 2025. We are new and we are building carefully: a few activities, run well, with partners who share our goals."
   - Paragraph: the legal status line from section 2.

6. **Leadership team.** Heading: "Leadership team". A grid of person cards. Each card has a square photo, a name, a title, and a short description of two or three sentences. Build it from `team.ts` with three placeholder entries ("Name", "Title", "Short description to come.").

7. **Board of directors.** Heading: "Board of directors". A grid of smaller person cards. Each has a square photo and a name only. Build it from `team.ts` with three placeholder entries.

Do not invent names, titles, or biographies. Real ones will be added to `team.ts` later.

### Activities

1. **Page heading:** "Activities" (yellow band), with this line beneath: "These are the activities R Journey runs for children and teens with Autism Spectrum Disorder (ASD). To join one, or to ask when the next session is, call or text us."

2. **Three story blocks,** alternating photo left and right, each with an `id` so the home page cards can link to it. Each ends with the "Call or text (858) 610-9661" button.

   **STEM Builders Camp** (yellow panel; photo placeholder: "Photo: STEM Builders Camp")
   - "Children with ASD learn the basics of coding: how to give a computer clear instructions and see what it does with them."
   - "We run the camp with STEM Leaders, whose coaches teach the sessions. For neurodivergent children who enjoy patterns, logic, and building things, it is an early look at skills that can lead to real work later on."

   **Flower Sale** (orange panel; photo placeholder: "Photo: bouquets from the Flower Sale")
   - "Children and teens with ASD who are curious about floristry arrange fresh bouquets by hand. Then the bouquets go on sale, and the young florists help sell them."
   - "Arranging flowers builds fine motor skills. Selling them gives neurodivergent young people practice talking with customers. Every bouquet sold pays for more R Journey activities."

   **Badminton Camp** (yellow panel; photo placeholder: "Photo: Badminton Camp")
   - "Children with ASD learn badminton from the very first serve. Volunteers from R Journey and Rookie Rackets, a fellow nonprofit, coach together, and Peak Sports in Morrisville donates the court time."
   - "Badminton is good for coordination, and it gives neurodivergent children a way into a sport at their own pace."

3. **Call-to-action strip** (pink): "Not sure which one fits?" with the button "Call or text (858) 610-9661".

### Contact

1. **Page heading:** "Talk to us" (yellow band).

2. **Intro** (paper background).
   - "The quickest way to reach us is a call or a text. Tell us a little about your child, or about yourself, and what you're interested in. We'll take it from there."
   - "If calling is hard for you, text or email instead. Any of them is fine."

3. **Contact details,** as large blocks in a row or grid, each one a link:
   - "Call or text": (858) 610-9661
   - "Email": the email from `site.ts`
   - "Instagram": @rjourneyorg
   - "Mail": the mailing address, shown only when set
   - "Where we are": Apex, North Carolina. Serving families across the Triangle.

4. **Sign up** (orange panel).
   - Heading: "Sign up for an activity"
   - "Call or text and tell us which activity you're interested in. We'll let you know when the next session is and what to bring."
   - Button: "Call or text (858) 610-9661".

5. **Give** (pink panel, `id="give"`).
   - Heading: "Make a donation"
   - "Every gift goes toward activities for children and teens with ASD."
   - Small text: the legal status line from section 2.
   - Button: Donate. While the donate URL is empty, replace this one button with the "Call or text" button so the Contact page never links to itself.

### Page metadata

Give each page a unique `<title>` and meta description written from the copy above, plus Open Graph tags. Use a placeholder favicon.

## 6. Display control: Calm, Standard, Vivid

Many people with ASD process light, color, and movement more intensely than others. The site lets each visitor choose how it looks and moves. This is the most important feature in version one, and it is built first, because every other component takes its color and motion values from it.

### How it works

- One attribute on the `<html>` element records the mode: `data-mode="calm"`, `"standard"`, or `"vivid"`.
- `tokens.css` defines every color, spacing, type, and motion token three times, once per mode. All three modes live in that one stylesheet.
- A small inline script in the `<head>` reads the saved choice from `localStorage` and sets the attribute before the page paints, so the site never flashes the wrong mode.
- **Starting mode:** Calm if the visitor's device is set to reduce motion (`prefers-reduced-motion: reduce`); otherwise Standard. Vivid is only ever chosen by the visitor.
- With JavaScript off, the site shows Standard, and a `prefers-reduced-motion` media query removes all transitions.

### The control

- A button labeled with the word **"Display"** in the header of every page, with a second "Display settings" link in the footer. It uses a word, not only an icon.
- It opens a small panel with three large options, built as a radio group so the arrow keys work. Each has a one-line description:
  - **Calm:** "Muted colors. Nothing moves."
  - **Standard:** "Full color. Gentle motion."
  - **Vivid:** "Brighter color. More motion."
- The choice applies immediately, is saved on the device, and holds on every page. The Escape key closes the panel.

### The three modes

| | Calm | Standard | Vivid |
|---|---|---|---|
| Color | Muted and matte, on soft off-white | The palette in section 4 | The same hues, more saturated |
| Motion | None; every change is instant | Short, gentle transitions (200 to 300ms) on hover, focus, and click | Fuller transitions (up to 400ms), with cards scaling up and arrows sliding |
| Hover | An instant solid outline or underline | Soft fades and color shifts | Fades, scale, and movement |
| Layout | One column, extra spacing, larger text | As designed in section 4 | As designed in section 4 |
| Decoration | Hidden | Shown | Shown |

**Calm mode in detail.** Calm strips the site to the minimum while keeping it clean and well made.

- Palette: paper `#F5F2EC`, ink `#1F1F1F`, and matte, low-saturation versions of the three colors: straw `#E8DDA8` for yellow, dusty rose `#D9B8C4` for pink, sand `#DDBF9F` for orange. Black bands become paper with ink text.
- Calm lowers saturation, not contrast. Text stays dark on light and meets WCAG AA.
- Every animation and transition is off (`0ms`).
- All overlaps, staggers, sideways shifts, diamond clipping, offset button shadows, and background decoration are removed. Blocks stack in a single column with square photos.
- Headings switch from capitals in the display font to sentence case in the body font at bold weight.
- Body text is about 12 percent larger, and vertical spacing between sections increases.
- The activity cards have no clutter layer (section 7).

**Vivid mode in detail.** Suggested colors: yellow `#FFE033`, pink `#E6308A`, orange `#FF8A1F`. Keep the text color rules from section 4 and check contrast again.

### Rules for every mode

- Nothing moves unless the visitor causes it by hovering, focusing, tapping, or clicking. There are no scroll-triggered animations, no parallax, and no entrance effects in any mode.
- Nothing flashes, loops, auto-advances, or plays sound.
- Every hover effect has a keyboard-focus version and a tap version.

## 7. Clearing cards (home page activities)

The three activity cards on the home page sit under a faint layer of visual clutter. Hovering a card clears the clutter and the card becomes sharp and calm. The visitor experiences assumptions about autism giving way to a plain fact about what the activity is.

### Behavior in Standard and Vivid

- Cards use the staggered card row from section 4, colored yellow, orange, yellow.
- **At rest:** each card's color is slightly washed out, and a decorative layer of faint, overlapping words sits over it. The title is always fully readable and passes contrast checks. The sentence and button are visible but subdued.
- **On hover, keyboard focus, or tap:**
  1. The clutter layer fades out in about 300ms.
  2. The card settles into its full solid color and comes forward.
  3. The sentence and button become crisp and high-contrast.
  4. The neighboring cards dim slightly, without their titles dropping below AA contrast.
- Moving away reverses it gently.
- Vivid uses the same effect with brighter colors, a slightly denser clutter layer, and a small scale-up on the active card.

### The clutter layer

- It is made of faint fragments of common assumptions, stored as a list in `activities.ts` so they are easy to change: "just shy", "will grow out of it", "not listening", "too picky", "just a phase", "not trying".
- The fragments are small, rotated at different angles, overlapping, and no more than about 12 percent opacity. They must never be legible enough to read as R Journey's own statements.
- The layer is `aria-hidden` and is not selectable.

### In Calm mode

There is no clutter layer. Cards are clear from the start and stack in one column. Hover and focus add a solid outline instantly. The caption above the row changes to: "Three activities, each built around something children enjoy."

### Touch, keyboard, and screen readers

- **Touch:** the first tap clears the card; a second tap on the button follows the link.
- **Keyboard:** tabbing to a card clears it exactly as hover does.
- **Screen readers:** they hear only the title, sentence, and link.

## 8. Quality bar

- Responsive from 360px wide. On narrow screens, overlaps and staggers relax into a single column in every mode.
- WCAG AA contrast for all text in all three modes. Check each text and background pair.
- Full keyboard navigation with visible focus on every interactive element, plus a "Skip to content" link.
- Semantic HTML: one `<h1>` per page, headings in order, landmarks, and alt text on every image.
- No layout shift on load: reserve space for images and self-host fonts with `font-display: swap`.
- Add a short `README.md` explaining how to run the site, where to edit text, how to add a photo, how to set the donate URL, and how the display modes work.

## 9. Build order

1. Project setup, tokens for all three modes, base layout, fonts.
2. Display control (section 6), tested on a plain page before anything else is built.
3. Shared components: header, footer, button, donate button, placeholder, band, story block, person card.
4. Home page, including the clearing cards.
5. About, Activities, and Contact pages.
6. Accessibility and contrast pass in all three modes, then the README.

## 10. Later phases (do not build now)

Structure the code so these can be added without rework. Both wait on content that does not exist yet.

**Phase 2: "A spectrum that isn't a line."** Its own page. It opens with a horizontal line labeled "less autistic" to "more autistic" and the caption "This is how many people picture the spectrum." A button replaces the line with a wheel of six to eight trait spokes and a colored shape joining a point on each. Visitors drag points to reshape it, or pick example profiles. No scores or totals; a visible line says "This is an illustration, not an assessment." On phones each trait becomes a labeled slider. The trait names and example profiles need review by autistic people before this is built.

**Phase 3: Interest tiles.** A grid of community members under a heading such as "Ask us what we love." Each tile shows a first name and a portrait or drawn avatar; hovering reveals the thing that person loves, in their own words. The last tile invites visitors to share their own. It needs real people, written permission from each (and from a parent for children), and their own words, so it cannot be built until those are collected.

Both features will read their color and motion from the display mode, exactly as the clearing cards do.
