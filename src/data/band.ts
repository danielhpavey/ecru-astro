// Central place for band details used across pages. Placeholder copy —
// replace with the real thing.

export const BAND = {
  name: "The Ecru Stretch",
  tagline: "Probably the best band in the world... Probably...",
  shortBio:
    "We are The Ecru Stretch, a high-octane indie pop & punk covers band dedicated to one thing: turning every gig into a massive, unforgettable gig.",
  email: "hello@the-ecru-stretch.uk",
  bookingEmail: "booking@the-ecru-stretch.uk",
  location: "Exeter, UK",
};

export const MEMBERS: { name: string; role: string }[] = [
  { name: "Kat", role: "Drums" },
  { name: "Dave", role: "Bass" },
  { name: "Dan", role: "Guitar" },
  { name: "Lee", role: "Vocals" },
];

// Leave href empty to hide a link.
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/the.ecru.stretch" },
  { label: "Facebook", href: "https://www.facebook.com/theecrustretch" },
  { label: "Bandcamp", href: "" },
  { label: "Spotify", href: "" },
  { label: "YouTube", href: "https://www.youtube.com/@the-ecru-stretch" },
].filter((link) => link.href);
