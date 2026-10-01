// Central place for band details used across pages. Placeholder copy —
// replace with the real thing.

export const BAND = {
  name: "The Ecru Stretch",
  tagline: "Probably the best band in the world... Probably...",
  // Home page hero. The heading is the page's <h1>: read by search engines
  // and screen readers but visually hidden, since the logo plays that role.
  heroHeading: "The Ecru Stretch - Indie Pop & Punk Covers Band in Exeter, Devon",
  heroIntro:
    "High-octane indie pop & punk covers for gigs, weddings, and events across Exeter and the South West.",
  logoAlt: "The Ecru Stretch - Indie Pop & Punk Covers Band Exeter",
  // Use \n for a new line, or \n\n for a blank line between sections.
  shortBio:
    "We are The Ecru Stretch, a high-octane indie pop & punk covers band dedicated to one thing: turning every gig into a massive, unforgettable event.\n\nBased in Exeter, Devon & gigging across the whole of the South West of England",
  email: "hello@the-ecru-stretch.uk",
  bookingEmail: "booking@the-ecru-stretch.uk",
  location: "Exeter, UK",
};

export interface Member {
  name: string;
  role: string;
  /** A sentence or two shown under the name on the About page. Optional. */
  bio?: string;
}

export const MEMBERS: Member[] = [
  {
    name: "Kat",
    role: "Drums",
    bio: "Placeholder: a sentence or two about Kat.",
  },
  {
    name: "Dave",
    role: "Bass",
    bio: "Born in Liverpool, plays a 1989 Squier Precision Bass playing through an Ashdown MAG300 Bass Combo.",
  },
  {
    name: "Dan",
    role: "Guitar",
    bio: "Devon, born and bred. Strong of arm, thick of head. Plays a Racing Green Fender Telecaster through a Fender Vaporizer Amp",
  },
  {
    name: "Lee",
    role: "Vocals",
    bio: "Enjoys writing songs and being self indulgent in home recording and collecting guitars.",
  },
];

// Leave href empty to hide a link.
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/the.ecru.stretch" },
  { label: "Facebook", href: "https://www.facebook.com/theecrustretch" },
  { label: "Bandcamp", href: "" },
  { label: "Spotify", href: "" },
  { label: "YouTube", href: "https://www.youtube.com/@the-ecru-stretch" },
].filter((link) => link.href);
