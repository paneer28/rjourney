// The site menu (the Menu button in the header).
//
// To add a page to the menu, add an item to a section's `items`.
// To add a section, add an entry with an `id` (used in the HTML), a `label`,
// and its items. The menu lays itself out from this list; nothing else changes.

import { donateLink } from './site';

export interface MenuItem {
  label: string;
  href: string;
  external?: boolean; // opens in a new tab
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menu: MenuSection[] = [
  {
    id: 'why-we-exist',
    label: 'Why we exist',
    items: [
      { label: 'People', href: '/why-we-exist/people' },
      { label: 'The bigger picture', href: '/why-we-exist/the-bigger-picture' },
    ],
  },
  {
    id: 'what-we-do',
    label: 'What we do',
    items: [{ label: 'Our programs', href: '/programs' }],
  },
  {
    id: 'get-involved',
    label: 'Get involved',
    items: [
      { label: 'Donate', href: donateLink.href, external: donateLink.external },
      { label: 'Partner on a program', href: '/get-involved/partner-on-a-program' },
      { label: 'Corporate partnerships', href: '/get-involved/corporate-partnerships' },
    ],
  },
  {
    id: 'who-we-are',
    label: 'Who we are',
    items: [
      { label: 'About us', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
];

// Is this item the page being viewed? Links to a part of a page (#...) and
// to other sites never count.
export function isCurrentPage(href: string, pathname: string): boolean {
  if (href.includes('#') || /^[a-z]+:/i.test(href)) return false;
  const clean = (path: string) => path.replace(/\/$/, '') || '/';
  return clean(href) === clean(pathname);
}
