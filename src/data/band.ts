// Central place for band details used across pages. Placeholder copy —
// replace with the real thing.

export const BAND = {
  name: "The Ecru Stretch",
  tagline: "Placeholder tagline — something about the sound.",
  shortBio:
    "The Ecru Stretch is a band. Replace this with a one- or two-sentence summary of who you are and what you sound like.",
  email: "hello@the-ecru-stretch.uk",
  bookingEmail: "booking@the-ecru-stretch.uk",
  location: "Your town, UK",
};

export const MEMBERS: { name: string; role: string }[] = [
  { name: "Member One", role: "Vocals, guitar" },
  { name: "Member Two", role: "Bass" },
  { name: "Member Three", role: "Drums" },
  { name: "Member Four", role: "Keys" },
];

// Leave href empty to hide a link.
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "Bandcamp", href: "" },
  { label: "Spotify", href: "" },
  { label: "YouTube", href: "" },
].filter((link) => link.href);
