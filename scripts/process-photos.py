"""
Turns the supplied Instagram screenshots into web images.

Reads ./photos/ and writes public/images/. Originals are never modified.
Run with: python3 scripts/process-photos.py
"""

from PIL import Image, ImageEnhance
import os

SRC, OUT = "photos", "public/images"

# Content band inside each 975x2048 screenshot, found by edge detection.
BAND = {
    "igm 8": (697, 1673), "img 9": (697, 1673), "img 10": (697, 1673),
    "img 11": (697, 1673), "img 12": (697, 1673), "img 13": (697, 1673),
    "img 14": (697, 1673),
    "img 1": (474, 1694), "img 6": (427, 1647), "img 7": (427, 1647),
    "img 4": (637, 1632), "img 5": (637, 1631),
    "img 2": (292, 843), "img 3": (292, 843),
}

# Team cards split down the middle. The portrait is the left half, and each box
# below was placed by eye so the subject is framed rather than merely centred.
TEAM = {
    "img 14": ("rithika-garapati", (118, 28, 487, 489)),
    "img 13": ("shloka-mhaisekar", (0, 290, 487, 899)),
    "img 12": ("tanmayi-gottumukkala", (0, 30, 487, 639)),
    "igm 8": ("anirudh-arun", (0, 40, 487, 649)),
    "img 10": ("hansika-malladi", (0, 50, 487, 659)),
    "img 11": ("om-vyas", (0, 60, 487, 669)),
    "img 9": ("rajasi-jogdand", (0, 170, 487, 779)),
}

# Pixels trimmed from (left, top, right, bottom) to drop carousel and mute badges.
TRIM = {
    "img 2": (0, 0, 130, 0), "img 3": (0, 0, 130, 0),
    "img 6": (0, 95, 0, 95), "img 7": (0, 95, 0, 95),
}

# Badges over a flat background are painted out rather than cropped, so the
# poster stays centred. A `src_y` repaints each column from a clean row below,
# which keeps vertical features such as the gold rule intact.
PATCH = {
    "img 4": [{"box": (824, 24, 952, 126)}],
    "img 5": [{"box": (826, 42, 954, 122), "src_y": 132}],
}

FUNDRAISERS = {
    "img 7": "bake-sale-orders-boxed",
    "img 6": "baking-day-kitchen",
    "img 5": "bake-sale-price-list",
    "img 4": "bake-sale-poster",
    "img 2": "ceramic-painting-finished-piece",
    "img 3": "ceramic-painting-in-progress",
}

# The only real photographs of finished labs sit inside the flyer.
INSETS = {
    "lab-handover-adloor": (188, 545, 460, 697),
    "certificate-ceremony": (498, 545, 772, 697),
}


def enhance(im, sharp=1.25):
    """A light lift. These are compressed screenshots, so restraint matters."""
    im = ImageEnhance.Color(im).enhance(1.07)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    return ImageEnhance.Sharpness(im).enhance(sharp)


def band_of(name):
    y0, y1 = BAND[name]
    im = Image.open(f"{SRC}/{name}.jpeg").convert("RGB")
    return im.crop((0, y0, im.width, y1))


def repaint(im, spec):
    x0, y0, x1, y1 = spec["box"]
    src_y = spec.get("src_y")
    if src_y is None:
        im.paste(im.getpixel((x0 - 20, y0 + 4)), spec["box"])
        return
    for x in range(x0, x1):
        im.paste(im.getpixel((x, src_y)), (x, y0, x + 1, y1))


def save(im, category, slug, quality=88):
    path = f"{OUT}/{category}/{slug}.jpg"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, quality=quality, optimize=True, progressive=True)
    print(f"  {path}  {im.width}x{im.height}")


def main():
    print("Team portraits")
    for name, (slug, box) in TEAM.items():
        save(enhance(band_of(name).crop(box)), "team", slug, quality=90)

    print("Fundraisers")
    for name, slug in FUNDRAISERS.items():
        im = band_of(name)
        for spec in PATCH.get(name, []):
            repaint(im, spec)
        if name in TRIM:
            l, t, r, b = TRIM[name]
            im = im.crop((l, t, im.width - r, im.height - b))
        save(enhance(im), "fundraisers", slug)

    print("Impact")
    flyer = band_of("img 1")
    save(enhance(flyer, sharp=1.1), "impact", "donate-50-laptops-flyer")
    for slug, box in INSETS.items():
        inset = flyer.crop(box)
        inset = inset.resize((inset.width * 3, inset.height * 3), Image.LANCZOS)
        save(enhance(inset, sharp=1.6), "impact", slug, quality=90)


if __name__ == "__main__":
    main()
