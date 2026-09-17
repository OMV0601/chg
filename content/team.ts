import type { Chapter } from "./site";

export type Role = string;

export interface Member {
  id: string;
  name: string;
  /** TODO where the carousel slide did not print one. */
  role: Role;
  /** TODO for everyone: no slide states a chapter. */
  chapter: Chapter | "TODO: chapter";
  /** Tier drives arrival order on the red carpet. */
  tier: "lead" | "member";
  photo: string | null;
  alt: string;
  /** Verbatim from the member's carousel slide. Do not paraphrase. */
  quote?: string;
  favouriteQuote?: string;
}

/**
 * Transcribed from the twelve-slide "meet the team" carousel on Instagram.
 * Slides 1, 5, 6, 7 and 12 were not supplied, so five members are missing.
 * Roles printed on a slide are used verbatim. Where a slide printed none,
 * the role is a TODO and must not be invented.
 */
export const members: Member[] = [
  {
    id: "rithika-garapati",
    name: "Rithika Garapati",
    role: "Manager",
    chapter: "TODO: chapter",
    tier: "lead",
    photo: "/images/team/rithika-garapati.jpg",
    alt: "Rithika Garapati, smiling, photographed outdoors.",
    quote: "When I'm not eating ice cream, I love to read.",
    favouriteQuote:
      "Life isn't about finding yourself; it's about creating yourself.",
  },
  {
    id: "shloka-mhaisekar",
    name: "Shloka Mhaisekar",
    role: "Sub-Manager",
    chapter: "TODO: chapter",
    tier: "lead",
    photo: "/images/team/shloka-mhaisekar.jpg",
    alt: "Shloka Mhaisekar, standing outdoors with a building behind her.",
    quote:
      "When I'm not eating pasta, I love to spend time with my family and friends.",
    favouriteQuote:
      "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  },
  {
    id: "tanmayi-gottumukkala",
    name: "Tanmayi Gottumukkala",
    role: "Sub-Manager",
    chapter: "TODO: chapter",
    tier: "lead",
    photo: "/images/team/tanmayi-gottumukkala.jpg",
    alt: "Tanmayi Gottumukkala, photographed outdoors with conifers behind her.",
    quote: "When I'm not eating sour punch, I love walking my dog.",
    favouriteQuote:
      "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
  },
  {
    id: "anirudh-arun",
    name: "Anirudh Arun",
    role: "TODO: role",
    chapter: "TODO: chapter",
    tier: "member",
    photo: "/images/team/anirudh-arun.jpg",
    alt: "Anirudh Arun, a head and shoulders portrait.",
    quote: "When I'm not watching tv, I love spending time with my friends.",
    favouriteQuote:
      "Happiness can be found in the darkest of times, if one can remember to turn on the light.",
  },
  {
    id: "hansika-malladi",
    name: "Hansika Malladi",
    role: "TODO: role",
    chapter: "TODO: chapter",
    tier: "member",
    photo: "/images/team/hansika-malladi.jpg",
    alt: "Hansika Malladi, standing outside a modern building.",
    quote: "Sleeping is my favorite hobby.",
    favouriteQuote: "It's not that I'm lazy, I just don't care.",
  },
  {
    id: "om-vyas",
    name: "Om Vyas",
    role: "TODO: role",
    chapter: "TODO: chapter",
    tier: "member",
    photo: "/images/team/om-vyas.jpg",
    alt: "Om Vyas, holding a golf club at a driving range in the evening.",
    quote: "When I'm not eating mangos, I love playing sports.",
    favouriteQuote:
      "The magic you are looking for is the work that you are avoiding.",
  },
  {
    id: "rajasi-jogdand",
    name: "Rajasi Jogdand",
    role: "TODO: role",
    chapter: "TODO: chapter",
    tier: "member",
    photo: "/images/team/rajasi-jogdand.jpg",
    alt: "Rajasi Jogdand, photographed at a stadium.",
    quote: "When I'm not eating Takis, I like to listen to music.",
    favouriteQuote:
      "Sometimes the best decisions are the ones that don't make sense at all.",
  },
];

/** Leads walk the carpet first, then everyone else. */
export const arrivalOrder: Member[] = [
  ...members.filter((m) => m.tier === "lead"),
  ...members.filter((m) => m.tier === "member"),
];

export const teamNote =
  "Five of the twelve team members are still to be added, along with chapters for everyone listed.";
