# Happy Wishes

Personalized wish pages for weddings, birthdays, anniversaries, and short signature formats.

Guests see **one** live page at `/`. You pick which template that is, then edit names, photos, colors, and copy in a single file.

---

## Run it

### First-time example

From a terminal:

```bash
cd /opt/HappyWishes
npm install
npm run dev
```

You can skip `cp .env.example .env.local`. That command only copies a small settings file so the app knows its public URL. For local use it already defaults to `http://localhost:3000`.

If you do want that file (needed later when you deploy to a real domain):

```bash
cp .env.example .env.local
```

That means: copy `.env.example` and name the copy `.env.local`.

You should see something like:

```text
▲ Next.js 16.3.0
- Local: http://localhost:3000
```

Leave that terminal running. Then open these in the browser:

| Open this | You should see |
|---|---|
| http://localhost:3000 | Whatever is set in `templates/live.ts` (currently Forever Starts Here) |
| http://localhost:3000/gallery | All 21 templates with standout blurbs |
| http://localhost:3000/birthday/confetti-pop/maya | Maya’s birthday demo |
| http://localhost:3000/wedding/sakura-vows/shehani-lasith | Sakura Vows sample wish |

Stop the server with `Ctrl+C`.

If port 3000 is already taken:

```bash
npm run dev -- --port 3001
```

Then use `http://localhost:3001` instead.

### After that

```bash
cd /opt/HappyWishes
npm run dev
```

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build (run build first)
npm run lint     # lint
```

---

## Ship one template (the usual workflow)

### 1. Pick the live template

Open `templates/live.ts` and change **one number**:

```ts
export const LIVE_TEMPLATE = 6;
```

`6` is Confetti Pop. `1` is Forever Starts Here. Save, then refresh `/`.

Numbers:

```
 1 Forever Starts Here     6 Confetti Pop          11 Still Us
 2 Two Hearts, One Story   7 Milestone Moments     12 Years of Us
 3 Rustic Vows             8 Kids' Wonderland      13 Love Letter
 4 Minimal & Modern        9 Golden Years          14 Champagne Toast
 5 Royal Affair           10 Surprise Reveal       15 Our Playlist
                                              16 Memory Lane
                                              17 One Song, One Page
                                              18 Video Wish
                                              19 Anime Wish
                                              20 Sakura Vows
                                              21 Lankan Poruwa
```

### 2. Personalize a wish (one couple / one guest)

Each design can have **many** personalized wishes. Content lives here:

```
templates/{occasion}/{number}-{slug}/wishes/{wishId}.ts
```

Example — Sakura Vows for Shehani & Lasith:

```
templates/wedding/20-sakura-vows/wishes/shehani-lasith.ts
```

Guest URL:

```
/wedding/sakura-vows/shehani-lasith
```

`meta.wishId` must match the filename (without `.ts`).

**Add another couple on the same design:**

1. Copy an existing wish file, e.g. `shehani-lasith.ts` → `nimal-dilani.ts`
2. Change `meta.wishId` to `"nimal-dilani"`
3. Edit names, date, place, photos, copy
4. Register it in `templates/_shared/catalog.ts` inside that design’s `wishes: [...]` array
5. Optional media folder:

```
public/media/wedding/20-sakura-vows/wishes/nimal-dilani/images/
public/media/wedding/20-sakura-vows/wishes/nimal-dilani/music/
```

Pick the live homepage in `templates/live.ts`:

```ts
export const LIVE_TEMPLATE = 20;
export const LIVE_WISH = "shehani-lasith";
```

Do not put personal content in `Template.tsx` or `Experience.tsx`. Those are the design.

To open Maps, set `event.place`. Clicking the place name opens Google Maps:

```ts
place: {
  name: "Galle Face Hotel",
  city: "Colombo",
  mapUrl: "https://maps.google.com/?q=Galle+Face+Hotel+Colombo",
},
```

### 3. Add your photos / music / video

**Photos — two ways (mix them in the same list):**

1. **URL:** paste any `https://` image link into `src`.
2. **Stored in the app:** drop the file in **that wish’s** images folder:

```
public/media/wedding/20-sakura-vows/wishes/shehani-lasith/images/hero.jpg
```

```ts
photos: [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80", alt: "Couple" },
  { src: "hero.jpg", alt: "Our photo" },
]
```

**Music:** drop the file in that wish’s **music** folder:

```
public/media/wedding/20-sakura-vows/wishes/shehani-lasith/music/background.mp3
```

```ts
music: { src: "background.mp3", title: "Our song" }
```

**Video:** drop the file in that wish’s **video** folder (`wish.mp4`). Until a local file exists, the music button stays disabled.

### 4. Set the public URL before a real deploy

In `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This makes Open Graph images, the sitemap, and share/QR links use the real domain.

Then:

```bash
npm run build
npm run start
```

Or connect the repo to Vercel and add `NEXT_PUBLIC_SITE_URL` in the project environment variables.

---

## What to edit in `data.ts`

| Field | What it does |
|---|---|
| `people` | Names on the page. First names are used in heroes. |
| `event.date` | ISO datetime. Drives countdown / “years together”. |
| `event.timeLabel` | Human-readable date line guests see. |
| `event.place` | Place guests go: `name`, `city`, optional `mapUrl` (Google Maps link). Click the place to open Maps. |
| `copy.headline` | Main title. |
| `copy.subhead` | Small line above or below the title. |
| `copy.message` | Body text. |
| `copy.cta` | Button label (RSVP, Play, Tap to reveal, …). |
| `palette` | All colors. The design reads these as CSS variables. |
| `media.photos` | Photo list. `src` can be an `https://` URL or a filename in the template media folder. |
| `media.music` | Background track path + title. |
| `media.video` | Welcome / tribute video path + poster. |
| `extras` | Template-specific features (see below). |

### `extras` by template

| Template | Extra fields · graphic standout |
|---|---|
| Forever Starts Here | `countdown`, `photoCarousel`, `backgroundMusic` · wax-seal envelope gate, gold bokeh |
| Confetti Pop | `milestoneAge`, `stickers`, `rsvp`, `backgroundMusic` · balloon-pop gate, sparkle |
| Two Hearts, One Story | `timeline` · book-open gate, draw-on story spine |
| Rustic Vows | `rsvp`, `event.place` · barn-door gate, growing vines |
| Minimal & Modern | `qrFriendly` · editorial wipe, scroll type, cursor glow |
| Royal Affair | `videoWelcome`, `guestWall` · curtain crest gate, gold shimmer |
| Milestone Moments | `milestoneAge`, `memoryGrid` · odometer age, parallax chapters |
| Kids' Wonderland | `milestoneAge`, `rsvp` · castle gate, star mascot |
| Golden Years | `milestoneAge`, `videoWelcome`, `guestWall` · album gate, Ken Burns, grain |
| Surprise Reveal | `milestoneAge`, `reveal.*` · gift-box unwrap entrance |
| Still Us | `thenNow.then` / `thenNow.now` · polaroid gate, then/now slider |
| Years of Us | `timeline`, `event.date` · animated counter, timeline spine |
| Love Letter | `letter.greeting`, `closing`, `signature` · wax seal, handwriting reveal |
| Champagne Toast | `milestoneAge`, `guestWall` · glass-clink gate, champagne bubbles |
| Our Playlist | `songs[]` · spinning vinyl, equalizer bars |
| Memory Lane | `timeline` (+ optional `place`) · Ken Burns chapters, film stamps |
| One Song, One Page | `media.music` · reactive glow, timed lyric lines |
| Video Wish | `media.video` · curtain rise, sparkle burst on end |
| Anime Wish | `milestoneAge`, `rsvp`, `backgroundMusic` · character idle, scene wipes |
| Sakura Vows | `rsvp`, `copy.subhead` · shoji doors, floral arch, washi |
| Lankan Poruwa | `timeline`, `rsvp` · oil-lamp pahana gate, gold shimmer |

### RSVP collection (hosts)

Guests submit **name + attending/declines** on the wish page. Each reply is stored **per wish** (`occasion` + template `slug` + `wishId`), so lists never mix across couples/events.

- Locally: saved under `.data/rsvp/` (gitignored).
- On Vercel: set `BLOB_READ_WRITE_TOKEN` so replies persist in private Blob storage.
- Host inbox: `/rsvp-inbox?occasion=wedding&template=sakura-vows&wish=shehani-lasith&secret=YOUR_RSVP_ADMIN_SECRET`

Set `RSVP_ADMIN_SECRET` in `.env` (see `.env.example`). Guest-wall messages still use the visitor’s browser only (`localStorage`).

---

## Template catalog

Graphic enhancement phases **0–7** are complete (shared FX, all 21 designs, final polish). Production build verified (**Phase 8**).

**Wedding**

| Name | Preview URL | Standout |
|---|---|---|
| Forever Starts Here | `/wedding/forever-starts-here/amara-julian` | Wax-seal envelope gate, gold bokeh |
| Two Hearts, One Story | `/wedding/two-hearts-one-story/nisha-arjun` | Book-open gate, story spine |
| Rustic Vows | `/wedding/rustic-vows/elena-mateo` | Barn doors, growing vines |
| Minimal & Modern | `/wedding/minimal-modern/sage-kai` | Editorial wipe, cursor glow |
| Royal Affair | `/wedding/royal-affair/isabella-alexander` | Curtain crest, gold shimmer |
| Sakura Vows | `/wedding/sakura-vows/shehani-lasith` | Shoji doors, floral arch |
| Sakura Vows (2nd) | `/wedding/sakura-vows/aiko-kenji` | Same design, second wish |
| Lankan Poruwa | `/wedding/lankan-poruwa/sanduni-kasun` | Oil-lamp pahana gate |

**Birthday**

| Name | Preview URL | Standout |
|---|---|---|
| Confetti Pop | `/birthday/confetti-pop/maya` | Balloon-pop gate, stickers |
| Milestone Moments | `/birthday/milestone-moments/dilan` | Odometer age, decade rail |
| Kids' Wonderland | `/birthday/kids-wonderland/ayaan` | Castle gate, star mascot |
| Golden Years | `/birthday/golden-years/lakshmi` | Album gate, Ken Burns |
| Surprise Reveal | `/birthday/surprise-reveal/priya` | Gift-box unwrap |
| Anime Wish | `/birthday/anime-wish/hana` | Character art, scene wipes |

**Anniversary**

| Name | Preview URL | Standout |
|---|---|---|
| Still Us | `/anniversary/still-us/hannah-theo` | Polaroid gate, then/now slider |
| Years of Us | `/anniversary/years-of-us/ravi-anjali` | Live years counter, timeline |
| Love Letter | `/anniversary/love-letter/claire-james` | Wax seal, handwriting reveal |
| Champagne Toast | `/anniversary/champagne-toast/margaret-william` | Glass clink, bubbles |
| Our Playlist | `/anniversary/our-playlist/sofia-leo` | Vinyl spin, EQ bars |

**Signature**

| Name | Preview URL | Standout |
|---|---|---|
| Memory Lane | `/signature/memory-lane/perera-family` | Ken Burns chapters, film stamps |
| One Song, One Page | `/signature/one-song-one-page/sam` | Reactive glow, lyric lines |
| Video Wish | `/signature/video-wish/amal` | Curtain rise, end burst |

---

## Folder map

```
templates/live.ts                   ← LIVE_TEMPLATE + LIVE_WISH
templates/{occasion}/{number}-{slug}/
  Template.tsx / Experience.tsx     ← design (rarely touch)
  wishes/{wishId}.ts                ← EDIT THIS (one file per couple/guest)
public/media/{occasion}/{number}-{slug}/wishes/{wishId}/
  images/  music/  video/           ← that wish’s local media
app/page.tsx                        ← live wish at /
app/gallery/page.tsx                ← all wishes
app/[occasion]/[template]/[wish]/ ← /wedding/sakura-vows/shehani-lasith
```

On every wish page:

- Bottom left: share + QR
- Bottom right: music (if that template has a track)

---

## What not to edit (unless you are changing the design)

- `Experience.tsx` — visual layout
- `templates/_shared/` — shared countdown, carousel, RSVP, OG images
- `app/` routes — only if you are changing how URLs work

Fonts are loaded in each `Template.tsx` with `next/font`. Changing `fonts` in `data.ts` does not swap the typeface by itself. Colors in `palette` do apply immediately.

---

## Quick example: turn this into Maya’s birthday

1. In `templates/live.ts` set `LIVE_TEMPLATE` to `6` and `LIVE_WISH` to `"maya"`.

2. In `templates/birthday/06-confetti-pop/wishes/maya.ts`, change `people`, `event`, `copy`, `palette`, and `media.photos`.

3. Optional: put `background.mp3` in `public/media/birthday/06-confetti-pop/wishes/maya/music/`.

4. Open `/` — that is the page you send people. Or share `/birthday/confetti-pop/maya`.
