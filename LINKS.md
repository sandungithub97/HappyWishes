# Happy Wishes — All Links

Guest wish pages and host **RSVP response** (inbox) links.

| Environment | Base URL |
|---|---|
| **Production** | https://happy-wishes-eight.vercel.app |
| **Local** | http://localhost:3000 |

Swap the host if you use a custom domain. Paths stay the same.

**Live page at `/` right now:** template **#22** · wish **`aria`**  
→ https://happy-wishes-eight.vercel.app/  
(Change in `templates/live.ts`.)

---

## Site

| Page | Production | Local |
|---|---|---|
| Live wish (`/`) | https://happy-wishes-eight.vercel.app/ | http://localhost:3000/ |
| Gallery (all wishes) | https://happy-wishes-eight.vercel.app/gallery | http://localhost:3000/gallery |
| RSVP inbox (needs query params) | https://happy-wishes-eight.vercel.app/rsvp-inbox | http://localhost:3000/rsvp-inbox |

---

## Guest wish links (share these)

### Wedding

| Template | Wish | Production URL |
|---|---|---|
| Forever Starts Here | amara-julian | https://happy-wishes-eight.vercel.app/wedding/forever-starts-here/amara-julian |
| Two Hearts, One Story | nisha-arjun | https://happy-wishes-eight.vercel.app/wedding/two-hearts-one-story/nisha-arjun |
| Rustic Vows | elena-mateo | https://happy-wishes-eight.vercel.app/wedding/rustic-vows/elena-mateo |
| Minimal & Modern | sage-kai | https://happy-wishes-eight.vercel.app/wedding/minimal-modern/sage-kai |
| Royal Affair | isabella-alexander | https://happy-wishes-eight.vercel.app/wedding/royal-affair/isabella-alexander |
| Sakura Vows | shehani-lasith | https://happy-wishes-eight.vercel.app/wedding/sakura-vows/shehani-lasith |
| Sakura Vows | aiko-kenji | https://happy-wishes-eight.vercel.app/wedding/sakura-vows/aiko-kenji |
| Lankan Poruwa | sanduni-kasun | https://happy-wishes-eight.vercel.app/wedding/lankan-poruwa/sanduni-kasun |

### Birthday

| Template | Wish | Production URL |
|---|---|---|
| Confetti Pop | maya | https://happy-wishes-eight.vercel.app/birthday/confetti-pop/maya |
| Milestone Moments | dilan | https://happy-wishes-eight.vercel.app/birthday/milestone-moments/dilan |
| Kids' Wonderland | ayaan | https://happy-wishes-eight.vercel.app/birthday/kids-wonderland/ayaan |
| Golden Years | lakshmi | https://happy-wishes-eight.vercel.app/birthday/golden-years/lakshmi |
| Surprise Reveal | priya | https://happy-wishes-eight.vercel.app/birthday/surprise-reveal/priya |
| Anime Wish | hana | https://happy-wishes-eight.vercel.app/birthday/anime-wish/hana |
| Lovely GF Birthday | aria | https://happy-wishes-eight.vercel.app/birthday/lovely-gf-birthday/aria |

### Anniversary

| Template | Wish | Production URL |
|---|---|---|
| Still Us | hannah-theo | https://happy-wishes-eight.vercel.app/anniversary/still-us/hannah-theo |
| Years of Us | ravi-anjali | https://happy-wishes-eight.vercel.app/anniversary/years-of-us/ravi-anjali |
| Love Letter | claire-james | https://happy-wishes-eight.vercel.app/anniversary/love-letter/claire-james |
| Champagne Toast | margaret-william | https://happy-wishes-eight.vercel.app/anniversary/champagne-toast/margaret-william |
| Our Playlist | sofia-leo | https://happy-wishes-eight.vercel.app/anniversary/our-playlist/sofia-leo |

### Signature

| Template | Wish | Production URL |
|---|---|---|
| Memory Lane | perera-family | https://happy-wishes-eight.vercel.app/signature/memory-lane/perera-family |
| One Song, One Page | sam | https://happy-wishes-eight.vercel.app/signature/one-song-one-page/sam |
| Video Wish | amal | https://happy-wishes-eight.vercel.app/signature/video-wish/amal |

---

## Host response links (RSVP inbox)

Only wishes with `extras.rsvp.enabled: true` collect replies.  
Host secret comes from `RSVP_ADMIN_SECRET` (currently `happywishes2026` in `.env` / Vercel).

**Do not share these with guests.** Each inbox is **per wish** — replies never mix across couples.

| Wish | Host inbox (production) |
|---|---|
| Sakura · shehani-lasith | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=wedding&template=sakura-vows&wish=shehani-lasith&secret=happywishes2026 |
| Sakura · aiko-kenji | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=wedding&template=sakura-vows&wish=aiko-kenji&secret=happywishes2026 |
| Rustic Vows · elena-mateo | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=wedding&template=rustic-vows&wish=elena-mateo&secret=happywishes2026 |
| Lankan Poruwa · sanduni-kasun | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=wedding&template=lankan-poruwa&wish=sanduni-kasun&secret=happywishes2026 |
| Confetti Pop · maya | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=birthday&template=confetti-pop&wish=maya&secret=happywishes2026 |
| Kids' Wonderland · ayaan | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=birthday&template=kids-wonderland&wish=ayaan&secret=happywishes2026 |
| Anime Wish · hana | https://happy-wishes-eight.vercel.app/rsvp-inbox?occasion=birthday&template=anime-wish&wish=hana&secret=happywishes2026 |

### Inbox URL shape

```
/rsvp-inbox?occasion={occasion}&template={slug}&wish={wishId}&secret={RSVP_ADMIN_SECRET}
```

Local examples (same paths):

- http://localhost:3000/rsvp-inbox?occasion=wedding&template=sakura-vows&wish=shehani-lasith&secret=happywishes2026
- http://localhost:3000/rsvp-inbox?occasion=birthday&template=anime-wish&wish=hana&secret=happywishes2026

### API (optional)

| Method | URL | Who |
|---|---|---|
| `POST` | `/api/rsvp` | Guests (name + attend/decline) |
| `GET` | `/api/rsvp?occasion=…&template=…&wish=…&secret=…` | Host only |

---

## Local mirrors (quick copy)

Same paths under `http://localhost:3000`:

```
http://localhost:3000/
http://localhost:3000/gallery

http://localhost:3000/wedding/forever-starts-here/amara-julian
http://localhost:3000/wedding/two-hearts-one-story/nisha-arjun
http://localhost:3000/wedding/rustic-vows/elena-mateo
http://localhost:3000/wedding/minimal-modern/sage-kai
http://localhost:3000/wedding/royal-affair/isabella-alexander
http://localhost:3000/wedding/sakura-vows/shehani-lasith
http://localhost:3000/wedding/sakura-vows/aiko-kenji
http://localhost:3000/wedding/lankan-poruwa/sanduni-kasun

http://localhost:3000/birthday/confetti-pop/maya
http://localhost:3000/birthday/milestone-moments/dilan
http://localhost:3000/birthday/kids-wonderland/ayaan
http://localhost:3000/birthday/golden-years/lakshmi
http://localhost:3000/birthday/surprise-reveal/priya
http://localhost:3000/birthday/anime-wish/hana
http://localhost:3000/birthday/lovely-gf-birthday/aria

http://localhost:3000/anniversary/still-us/hannah-theo
http://localhost:3000/anniversary/years-of-us/ravi-anjali
http://localhost:3000/anniversary/love-letter/claire-james
http://localhost:3000/anniversary/champagne-toast/margaret-william
http://localhost:3000/anniversary/our-playlist/sofia-leo

http://localhost:3000/signature/memory-lane/perera-family
http://localhost:3000/signature/one-song-one-page/sam
http://localhost:3000/signature/video-wish/amal
```

---

## Template numbers (`templates/live.ts`)

```
 1 Forever Starts Here          wedding
 2 Two Hearts, One Story        wedding
 3 Rustic Vows                  wedding
 4 Minimal & Modern             wedding
 5 Royal Affair                 wedding
 6 Confetti Pop                 birthday
 7 Milestone Moments            birthday
 8 Kids' Wonderland             birthday
 9 Golden Years                 birthday
10 Surprise Reveal              birthday
11 Still Us                     anniversary
12 Years of Us                  anniversary
13 Love Letter                  anniversary
14 Champagne Toast              anniversary
15 Our Playlist                 anniversary
16 Memory Lane                  signature
17 One Song, One Page           signature
18 Video Wish                   signature
19 Anime Wish                   birthday
20 Sakura Vows                  wedding
21 Lankan Poruwa                wedding
22 Lovely GF Birthday           birthday
```

Example — set Lovely GF Birthday live:

```ts
export const LIVE_TEMPLATE = 22;
export const LIVE_WISH = "aria";
```

---

## Notes

1. **New wish** = new file under `templates/{occasion}/{number}-{slug}/wishes/{wishId}.ts` → URL `/{occasion}/{slug}/{wishId}`.
2. **RSVP on a wish** = set `extras.rsvp.enabled: true` in that wish file, then use the inbox URL pattern above.
3. **Production RSVP storage** needs `BLOB_READ_WRITE_TOKEN` on Vercel; local saves under `.data/rsvp/`.
4. Rotate `RSVP_ADMIN_SECRET` if a host link was shared publicly, then update this doc and Vercel env.
