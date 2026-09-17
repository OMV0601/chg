# Code Hope Global

Website for Code Hope Global, a 501(c)(3) nonprofit that builds computer labs in
rural Indian schools.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build, must pass with no errors
npm run start   # serve the production build
npm run lint
```

Deploying to Vercel needs no configuration. Import the repository and it builds
as a standard Next.js App Router project.

## Routes

| Route | What it is |
| --- | --- |
| `/` | The walk scene, then the mission, the numbers and the 501(c)(3) record |
| `/fundraisers` | Every fundraiser, with a filter and a photo lightbox |
| `/team` | The team, arriving one at a time down a red carpet |

## Editing the content

Nothing factual is written into a component. It all lives in `content/`:

- **`content/site.ts`** stats, the mission, the EIN, the legal wording, and every
  link including the donate URL. The placeholder links are the ones to replace first.
- **`content/fundraisers.ts`** each fundraiser, its gallery and the food sale cycle.
- **`content/team.ts`** each member, their role, chapter and quotes.
- **`content/photo-manifest.md`** what every supplied photograph contains and
  where it ended up.

Anything not yet verified is written as a `TODO:` string. Those never reach the
page: `src/lib/placeholder.ts` detects them and the components leave the field
out rather than printing it.

Two switches in `content/site.ts` are worth knowing about:

- `photosAvailable` renders labelled placeholders instead of images when false.
- `labPhoto` is the photograph crossfaded in at the end of the walk.

## Photographs

Originals live in `photos/` and are never written to. To regenerate the web
copies in `public/images/`:

```bash
python3 scripts/process-photos.py
```

The script holds the crop box for every image, removes the Instagram interface
from around each one, and writes progressive JPEGs.

## How the walk scene works

`src/components/walk/WalkScene.tsx` pins a full height stage inside a tall
section and maps scroll progress through a single `render(p)` function. Every
layer, the sky, the children's limbs, the camera push and the lab all read from
that one number, so the scene is reversible by construction and stops when the
reader stops.

The walk cycle is a function of scroll distance rather than time, which is why
scrolling faster makes the children walk faster. `render` only ever writes
`transform` and `opacity`.

Anyone whose system asks for reduced motion gets `WalkStatic.tsx` instead: no
pin, no scrubbing, and the three story beats as plain text.
