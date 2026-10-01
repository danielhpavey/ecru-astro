import { SOCIAL_LINKS } from "./band";

const SITE = "https://the-ecru-stretch.uk";

/**
 * schema.org description of the band, output in the <head> of every page
 * (see Layout.astro) so search engines can identify the band, its area and
 * its social profiles. sameAs comes from SOCIAL_LINKS, so it always matches
 * the footer.
 */
export const BAND_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "The Ecru Stretch",
  url: `${SITE}/`,
  logo: `${SITE}/og-default.jpg`,
  image: `${SITE}/og-default.jpg`,
  description:
    "High-octane indie pop and punk covers band based in Exeter, Devon, performing at weddings, festivals, pubs, and private events across the South West of England.",
  genre: ["Indie Pop", "Punk Rock", "Cover Band"],
  locationCreated: {
    "@type": "Place",
    name: "Exeter, Devon, United Kingdom",
  },
  areaServed: ["Devon", "Cornwall", "Somerset", "Dorset"].map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};
