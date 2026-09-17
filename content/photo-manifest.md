# Photo manifest

All 14 source images from `Vipul - Personal/chg` were reviewed. Every one is a
**phone screenshot of an Instagram post** from the account `theempowerherproject50`,
which tags `@codehopeglobal`. Each therefore carries Instagram interface chrome
(top bar, like and comment row, caption) that must be cropped away before the
photo can be used on the site.

Status legend
- `READY` the crop region is identified and the image is slotted into the site
- `BLOCKED` cannot be produced until the original file is on disk
- `UNUSED` not used on the site, reason given

All fourteen were delivered through the `OMV0601/chg` GitHub repository, copied
into `./photos/` untouched, and processed by `scripts/process-photos.py`. That
script holds the exact crop box for every image and can be re-run at any time.

## Category: impact (`public/images/impact/`)

| Source | Destination | What is in it |
| --- | --- | --- |
| img 1 | `donate-50-laptops-flyer.jpg` | Code Hope Global flyer, "Help us donate 50 laptops to high-achieving Indian students". Lists the three programmes, names past projects in Adloor Yellareddy and ZPHS Palwancha, carries the QR code, the website, the email and the full 501(c)(3) and EIN line. Posted 30 September 2024. |
| img 1 (inset, left) | `lab-handover-adloor.jpg` | Inset photo inside the flyer. A row of desktop computers along a wall of a school room, about eight adults standing in front of them, banner overhead reading "Sponsored By Code Hope Global". This is the closest thing to a real lab photo in the set. |
| img 1 (inset, right) | `certificate-ceremony.jpg` | Inset photo inside the flyer. Children and adults on a stage behind a red cloth table, certificates being handed over, Code Hope Global banner behind. |

## Category: fundraisers (`public/images/fundraisers/`)

| Source | Destination | What is in it |
| --- | --- | --- |
| img 4 | `bake-sale-poster.jpg` | Poster, slide 1 of 3. Large serif "Bake Sale!" over the pale pink cupped-hands logo, with "100% of the proceeds go towards the cause!". |
| img 5 | `bake-sale-price-list.jpg` | Poster, slide 2 of 3. "Code Hope Global Bake Sale", cookies $3, brownies $4, the digital-divide explanation, order deadline 10 February, delivery 15 to 16 February. Photographic cookies and brownies down both edges. |
| img 6 | `baking-day-kitchen.jpg` | Slide 8 of 9, posted 1 February 2025. Two team members hugging in a domestic kitchen, baking supplies across the island: eggs, parchment paper, a mixing bowl, measuring cups. Warm and candid. |
| img 7 | `bake-sale-orders-boxed.jpg` | Slide 6 of 9, same post. Two team members behind a tall stack of about twenty white bakery boxes on a dining table, order slips laid out beside them. The single best image of the door-to-door operation. |
| img 2 | `ceramic-painting-finished-piece.jpg` | Slide 4 of 9, posted 30 June 2025. A young participant holds up a finished ceramic leopard painted green, red, yellow and blue. Garage setting, bicycle behind. |
| img 3 | `ceramic-painting-in-progress.jpg` | Slide 2 of 9, same post. Overhead view of a participant painting a ceramic animal with a fine brush, snack bags on the table. |

## Category: team (`public/images/team/`)

Seven of the twelve slides in the "meet the team" carousel are present. Each slide
is split down the middle: portrait on the left, name and quote on the right. Only
the left half gets cropped out for the site.

| Source | Slide | Destination | Portrait |
| --- | --- | --- | --- |
| img 14 | 2 of 12 | `rithika-garapati.jpg` | Smiling, cream beaded dress, outdoors on grass. |
| img 13 | 3 of 12 | `shloka-mhaisekar.jpg` | Black top and khaki cargo trousers, sunglasses pushed up, castle-style building behind. |
| img 12 | 4 of 12 | `tanmayi-gottumukkala.jpg` | Red floral top, long dark hair, conifers and blue sky behind. |
| igm 8 | 8 of 12 | `anirudh-arun.jpg` | Red shirt, close head-and-shoulders portrait, pale background. |
| img 10 | 9 of 12 | `hansika-malladi.jpg` | Black Midwest Open Regional badminton shirt and jeans, modern glass building behind. |
| img 11 | 10 of 12 | `om-vyas.jpg` | Grey graphic t-shirt, holding a golf club at a driving range at dusk. |
| img 9 | 11 of 12 | `rajasi-jogdand.jpg` | Pink top and white cardigan, stadium seating behind. |

## Unused

| Source | Why |
| --- | --- |
| (none) | All 14 images carry usable content. |

Slides 1, 5, 6, 7 and 12 of the twelve-slide team carousel were not supplied, so
five team members are missing entirely.

## What the processing does

1. Detects the Instagram chrome by scanning for rows that are dark at both outer
   edges, since a post image always runs edge to edge.
2. Crops to the content band.
3. Splits team cards down the middle and frames each portrait individually.
4. Paints out the carousel counter where it sits on a flat background, and crops
   it away where it does not.
5. Applies a light colour, contrast and sharpness lift, then writes a
   progressive JPEG.

## A note on quality

These are screenshots of compressed Instagram posts, so the usable pixels are
limited. The team portraits are the worst case: each is roughly half of a phone
screenshot, so expect something near 470 by 950 pixels before cropping. They will
look fine at the card sizes the team page uses and should not be blown up larger.
Original camera files, if anyone still has them, would be a real upgrade.
