// Site-wide facts and contact settings.
// Edit text here; the layout reads it from this file.

const phoneDigits = '8586109661';

export const site = {
  name: 'R Journey',
  tagline: 'Building Bright Futures Together',
  location: 'Apex, North Carolina',
  region: 'the Triangle',
  founded: 2025,

  // Leave empty to show the "R Journey" text wordmark. Example: '/images/logo.svg'
  logo: '',

  // Small cartoon flowers tucked around the site as decoration (an easter egg:
  // they spin when hovered). Set to false to remove them everywhere.
  flowers: true,

  phone: {
    display: '(858) 610-9661',
    tel: `tel:+1${phoneDigits}`,
    sms: `sms:+1${phoneDigits}`,
  },

  // TODO: placeholder address; confirm the real one before launch.
  email: 'rjourney@gmail.com',

  instagram: {
    handle: 'rjourneyorg',
    url: 'https://www.instagram.com/rjourneyorg/',
  },

  // Leave empty to hide the address everywhere. Example: '123 Main St, Apex, NC 27502'
  mailingAddress: '',

  // The online giving page (e.g. a payment provider's donation form). Leave empty
  // until online giving is set up. Every Donate link on the site goes to the
  // Donate page (/donate); this decides what that page's main button does:
  // while empty, visitors are asked to call or text; once set, a Donate button
  // opens this URL in a new tab.
  donateUrl: '',

  // Use this exact wording wherever legal status is mentioned.
  statusLine:
    'R Journey is a North Carolina nonprofit corporation. Our application for 501(c)(3) tax-exempt status is pending with the IRS.',
};

// Where every Donate link goes: the Donate buttons, the menu, and the footer.
export const donateLink = {
  href: '/donate',
  external: false,
};
