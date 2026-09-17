/**
 * Single source of truth for every verifiable number, legal detail and link.
 * Edit this file to correct the site. Nothing here should be hard-coded elsewhere.
 */

export const org = {
  name: "Code Hope Global",
  tagline: "Empower Dreams. Transform Lives.",
  mission:
    "We bridge the digital divide in rural India so every child, wherever they live, grows up confident with technology.",
  legalForm: "Washington nonprofit corporation",
  taxStatus: "501(c)(3)",
  ein: "93-2282761",
  taxLine:
    "Code Hope Global is a Washington nonprofit corporation exempt from federal income tax under Section 501(c)(3) of the Internal Revenue Code. Donations are tax-deductible to the extent allowed by law.",
} as const;

/** The problem we exist to solve. Source: Code Hope Global. */
export const problem = {
  statValue: 4,
  statSuffix: "%",
  statLabel: "of rural schools in India have functional computers",
  source: "Code Hope Global",
} as const;

/**
 * Impact numbers. VERIFY BEFORE PUBLISHING.
 * `value` drives the count-up, `display` is what a reader sees.
 */
export const stats = [
  {
    id: "laptops",
    value: 113,
    display: "113",
    label: "Laptops donated",
    detail: "Machines placed in schools that had none.",
  },
  {
    id: "villages",
    value: 50,
    display: "50+",
    label: "Villages impacted",
    detail: "Communities where a lab now exists.",
  },
  {
    id: "raised",
    value: 10000,
    display: "$10,000",
    prefix: "$",
    label: "Raised by our Seattle chapter",
    detail: "Earned door to door, one order at a time.",
  },
  {
    id: "team",
    value: 20,
    display: "20+",
    label: "Team members",
    detail: "Students across Washington and California.",
  },
] as const;

/** What we actually do on the ground. */
export const pillars = [
  {
    id: "labs",
    title: "We build computer labs",
    body: "We equip rural schools with working computers and a projector, so a whole class can learn at once instead of crowding one screen.",
  },
  {
    id: "teachers",
    title: "We train the teachers",
    body: "A lab is only useful if someone can run it. We show teachers how to find and use online resources, then leave them able to teach without us.",
  },
  {
    id: "kids",
    title: "We teach kids to code",
    body: "Students write their first lines of code and see a machine do what they asked. We push hard to get girls into that chair, because they are the ones most often left out of it.",
  },
] as const;

/** A true sequence, so it is numbered. */
export const moneyToLab = [
  {
    title: "We fundraise",
    body: "Students cook and sell food door to door, run workshops, and ask their networks to give.",
  },
  {
    title: "We buy equipment",
    body: "Funds go into computers, a projector and the cables and power strips that make them usable.",
  },
  {
    title: "We install the lab",
    body: "We set the room up in a school that has none, and make sure every machine turns on.",
  },
  {
    title: "We train teachers",
    body: "Staff learn the tools well enough to run lessons after we leave.",
  },
  {
    title: "Kids learn",
    body: "Students use the lab every week, and coding stops being something other children do.",
  },
] as const;

export const chapters = ["Seattle", "California"] as const;
export type Chapter = (typeof chapters)[number];

/** TODO: replace every placeholder link before launch. */
export const links = {
  donate: "#TODO-donate-url",
  gofundme: "#TODO-gofundme-url",
  volunteer: "#TODO-volunteer-form-url",
  startChapter: "#TODO-start-a-chapter-url",
  email: "codehopeglobal@gmail.com",
  instagram: "#TODO-instagram-url",
  linkedin: "#TODO-linkedin-url",
} as const;

export const getInvolved = [
  {
    id: "donate",
    title: "Donate",
    body: "Every dollar buys hardware for a school that has none. Your gift is tax-deductible.",
    cta: "Donate",
    href: links.donate,
  },
  {
    id: "chapter",
    title: "Start a chapter",
    body: "Students run this. If you want a branch at your school, we will help you set it up.",
    cta: "Start a chapter",
    href: links.startChapter,
  },
  {
    id: "volunteer",
    title: "Volunteer",
    body: "Cook, sell, teach, or help us reach donors. There is room for whatever you are good at.",
    cta: "Volunteer",
    href: links.volunteer,
  },
] as const;

export const nav = [
  { label: "Our fundraisers", href: "/fundraisers" },
  { label: "Meet the team", href: "/team" },
] as const;

/**
 * A real photograph of a finished lab, crossfaded in at the end of the walk.
 * Cropped from the inset on the campaign flyer, which is the only picture of a
 * completed lab in the supplied set, so it is soft. A camera original would be
 * a straight upgrade.
 */
export const labPhoto: string | null = "/images/impact/lab-handover-adloor.jpg";

/** False renders labelled placeholders instead of requesting missing files. */
export const photosAvailable = true;

export const siteUrl = "https://www.codehopeglobal.org";
