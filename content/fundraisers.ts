export const fundraiserTypes = [
  "Food sale",
  "Workshop",
  "Online campaign",
] as const;
export type FundraiserType = (typeof fundraiserTypes)[number];

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Fundraiser {
  id: string;
  title: string;
  type: FundraiserType;
  /** Human readable. TODO where no date was printed on the source. */
  date: string;
  /** Sortable. Null where the date is unknown. */
  sortDate: string | null;
  location: string;
  /** Null means the amount is not yet known. Never guess one. */
  raisedUsd: number | null;
  summary: string;
  whatWeDid: string;
  whatItPaidFor: string;
  featured?: boolean;
  cover: string;
  coverAlt: string;
  gallery: GalleryImage[];
}

/**
 * Every fact here is taken from the supplied photographs. Anything the photos
 * did not state is marked TODO rather than filled in.
 */
export const fundraisers: Fundraiser[] = [
  {
    id: "bake-sale",
    title: "Door to door bake sale",
    type: "Food sale",
    date: "Orders closed 10 February, delivered 15 to 16 February",
    sortDate: "2025-02-15",
    location: "TODO: neighbourhood and city",
    raisedUsd: null,
    featured: true,
    summary:
      "Our largest and most repeatable fundraiser. We take orders one weekend, bake through the week, and deliver the next weekend.",
    whatWeDid:
      "We sold cookies at $3 and brownies at $4, took orders door to door, then spent the week baking in our own kitchens. Every box was labelled with its order slip before delivery. All of the proceeds went to the cause.",
    whatItPaidFor: "TODO: confirm what this sale funded",
    cover: "/images/fundraisers/bake-sale-orders-boxed.jpg",
    coverAlt:
      "Two team members standing behind a tall stack of white bakery boxes with order slips laid out on the table.",
    gallery: [
      {
        src: "/images/fundraisers/bake-sale-orders-boxed.jpg",
        alt: "Two team members behind a stack of about twenty white bakery boxes, order slips spread across the dining table.",
        caption: "Every box matched to its order slip before delivery.",
      },
      {
        src: "/images/fundraisers/baking-day-kitchen.jpg",
        alt: "Two team members hugging in a kitchen, baking supplies spread across the island.",
        caption: "Baking day, 1 February 2025.",
      },
      {
        src: "/images/fundraisers/bake-sale-price-list.jpg",
        alt: "Bake sale poster listing cookies at three dollars and brownies at four dollars, with order and delivery dates.",
        caption: "Cookies $3, brownies $4. Order by the 10th, delivered on the 15th.",
      },
      {
        src: "/images/fundraisers/bake-sale-poster.jpg",
        alt: "Bake sale poster reading one hundred percent of the proceeds go towards the cause.",
        caption: "The poster we handed out on the street.",
      },
    ],
  },
  {
    id: "ceramic-painting",
    title: "Ceramic painting workshop",
    type: "Workshop",
    date: "June 2025",
    sortDate: "2025-06-30",
    location: "TODO: venue and city",
    raisedUsd: null,
    summary:
      "An afternoon of ceramic painting for young kids, run by our team, with the takings going to the labs.",
    whatWeDid:
      "We set up tables, handed out plain ceramic figures and paints, and let the children take their pieces home at the end of the day.",
    whatItPaidFor: "TODO: confirm what this workshop funded",
    cover: "/images/fundraisers/ceramic-painting-finished-piece.jpg",
    coverAlt:
      "A child holding up a ceramic leopard painted in green, red, yellow and blue.",
    gallery: [
      {
        src: "/images/fundraisers/ceramic-painting-finished-piece.jpg",
        alt: "A child holding a finished ceramic leopard painted green with bright markings.",
        caption: "A finished piece, paint still drying.",
      },
      {
        src: "/images/fundraisers/ceramic-painting-in-progress.jpg",
        alt: "Overhead view of a child painting a ceramic animal with a fine brush.",
        caption: "Slow work with a fine brush.",
      },
    ],
  },
  {
    id: "fifty-laptops",
    title: "Fifty laptops campaign",
    type: "Online campaign",
    date: "September 2024",
    sortDate: "2024-09-30",
    location: "Online",
    raisedUsd: null,
    summary:
      "An email and social campaign asking our networks to fund fifty laptops for high school students in rural India heading to the NITs and IITs.",
    whatWeDid:
      "We shared the campaign by email and on social media, with a QR code that took donors straight to the giving page.",
    whatItPaidFor:
      "Laptops for high-achieving students, building on our earlier labs at Adloor Yellareddy and ZPHS Palwancha.",
    cover: "/images/impact/donate-50-laptops-flyer.jpg",
    coverAlt:
      "Code Hope Global campaign flyer asking for help donating fifty laptops to high-achieving Indian students.",
    gallery: [
      {
        src: "/images/impact/donate-50-laptops-flyer.jpg",
        alt: "Campaign flyer listing the three programmes, past projects, a QR code and the 501(c)(3) notice.",
        caption: "The flyer we sent out, QR code and all.",
      },
      {
        src: "/images/impact/lab-handover-adloor.jpg",
        alt: "A row of desktop computers along a classroom wall with adults standing in front of a Code Hope Global banner.",
        caption: "A finished lab, sponsored by Code Hope Global.",
      },
      {
        src: "/images/impact/certificate-ceremony.jpg",
        alt: "Children and adults on a stage behind a red cloth table during a certificate ceremony.",
        caption: "Certificates handed out at a project handover.",
      },
    ],
  },
];

/** How the food sales actually run. A true sequence. */
export const foodSaleCycle = [
  {
    title: "Take orders",
    body: "We walk the neighbourhood over a weekend and write down what people want.",
  },
  {
    title: "Bake through the week",
    body: "Evenings after school, in our own kitchens, in batches.",
  },
  {
    title: "Box and label",
    body: "Each order goes into its own box with the slip attached, so nothing gets mixed up.",
  },
  {
    title: "Deliver the next weekend",
    body: "We walk the same streets again and hand every order over in person.",
  },
];

export const knownTotalRaised = fundraisers.reduce<number>(
  (sum, f) => sum + (f.raisedUsd ?? 0),
  0,
);

export const amountsAreComplete = fundraisers.every(
  (f) => f.raisedUsd !== null,
);
