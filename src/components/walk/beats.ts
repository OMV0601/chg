export interface Beat {
  text: string;
  /** Scene progress at which the beat fades in and out. */
  from: number;
  to: number;
}

export const beats: Beat[] = [
  {
    text: "Every morning, kids across rural India walk to school.",
    from: 0.06,
    to: 0.24,
  },
  {
    text: "In most of those schools, there is no working computer.",
    from: 0.27,
    to: 0.45,
  },
  {
    text: "We are changing what waits at the end of the walk.",
    from: 0.47,
    to: 0.63,
  },
];
