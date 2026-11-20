# Bone & Kombu — design system

A quiet, editorial retail system: warm **Bone** paper, deep **Kombu Green** for the one action that matters, and **Café Noir** ink for everything you read. The structure — Helvetica Neue type scale, 5px corners, 52px controls, hairline rules and short ease-in-out motion — comes from the extracted tokens of atticusfinchclothing.com.au. Only the colours are new.

## Files

| File | What it is |
| --- | --- |
| `tokens.json` | Source of truth: every colour, type style, spacing, radius, border, size and shadow token with a usage note. |
| `tokens.css` | The same tokens as CSS variables (`--bone`, `--kombu-green`, `--space-16`…), the Pretendard `@font-face` rules, and one class per type style (`.display`, `.body`, `.link-sm`…). |
| `components/bundle.css` | Component styles (`.bk-btn`, `.bk-input`, `.bk-select`, `.bk-badge`). Reads its values from `tokens.css`. |
| `components/bundle.js` | React 18 components as `window.BoneKombu`: `Button`, `TextInput`, `Select`, `Badge`. |
| `components/index.d.ts` | Prop types. |
| `components/<Comp>/README.md` | Usage rules per component, with Korean examples. |
| `fonts/` | Pretendard 400 / 600 / 700 (woff2, SIL OFL). |
| `demo.html` | Open in a browser to see every component. |

## Using it in code

1. Load `tokens.css` first, then `components/bundle.css`. Keep `fonts/` next to `tokens.css` (the `@font-face` paths are relative).
2. Use the variables, never raw hex: `color: var(--cafe-noir)`, `background: var(--bone)`, `padding: var(--space-16)`, `border-radius: var(--radius-sm)`.
3. Plain HTML: use the classes directly — `<button class="bk-btn bk-btn-primary">장바구니 담기</button>`, `<input class="bk-input" type="email">`, `<select class="bk-select">`, `<span class="bk-badge bk-badge-accent">신상</span>`.
4. React: either load `components/bundle.js` after React 18 and use `window.BoneKombu.Button`, or rewrite the four components in your own codebase using the same class names.
5. Set `<html lang="ko">` on Korean pages.

## Colour mapping (source → this system)

| Source | Role | Now |
| --- | --- | --- |
| `#ffffff` background, input bg | ground | `bone` #E5D7C4 |
| `#111111` / `#000000` text, hairlines | ink | `cafe-noir` #4B3621 |
| `#112b46` primary | primary | `kombu-green` #354024 |
| `#3f4f60` accent (hover `#4c5f73`) | accent | `kombu-accent` #4F5E36 (hover `kombu-accent-hover`) |
| `#474d53` input border | muted ink | `cafe-noir-muted` #6E5A44 |
| `rgba(0,0,0,.15)` border, shadow | soft line | `line` rgba(75,54,33,.15) |
| `#ffffff` button text | text on green | `on-primary` #FFFFFF |

Contrast on `bone`: `cafe-noir` 8.0:1, `cafe-noir-muted` 4.6:1. White on `kombu-green` 11.0:1, on `kombu-accent` 7.0:1. Hover states darken (never lighten) so text on green stays legible.

## Visual foundations

- **Ground.** Pages sit on `bone`. Never pure white.
- **Ink.** All text is `cafe-noir`; secondary text is `cafe-noir-muted`. No pure black anywhere.
- **Primary.** `kombu-green` fills the single primary button per view (장바구니 담기, 구매하기, 구독하기) and the variant select. Text on green fills is white (`on-primary`).
- **Type.** One stack: Helvetica Neue for Latin, **Pretendard** for Korean (fallback Helvetica, Apple SD Gothic Neo, Malgun Gothic, Arial). Korean characters fall through to Pretendard automatically. For Korean body copy raise line height from 1.5 to about 1.6, and avoid letter-spacing on Hangul. Display 56px / 700, section titles 48px, card titles 22px, body 18–20px, links and UI 13–17px at 600, eyebrow labels 12px / 700 uppercase, fine print 10px.
- **Shape.** `radius-sm` (5px) on buttons, inputs, selects, cards and modals; `radius-pill` (50px) for pill buttons and tags; `radius-round` for icon buttons.
- **Lines.** Buttons carry a `border-button` (2px) outline in `line`; header and footer are divided by a 1px `line-strong` hairline. Elevation is a single soft `shadow-card`, used on hover and for overlays.
- **Controls.** Inputs and primary buttons are `control-height` (52px) with 16px × 18px padding.

## Motion

Short and quiet, always `ease-in-out` unless noted. Links 0.125s; buttons 0.125–0.15s; hero 0.2–0.25s; nav 0.2s `ease` on opacity/transform; modal 0.125–0.2s; cards 0.25–0.5s `ease-out` on transform and shadow.

## Breakpoints

1400 → 1200 → 1025 → 990 → 900 → 768 → 750 → 640 → 389px. The main layout switches at 990px (desktop nav) and 750px (mobile).

## Voice

Plain and short. Korean buttons: noun + …하기 / …담기 / …보기, no 요/니다 endings. English: verb first, sentence case. No exclamation marks, no emoji.

## Iconography and logo

No logo or icons are included. Use the name set in Helvetica Neue 700 in `cafe-noir` until a mark exists. Icons, when added, should be single-weight line icons drawn in `currentColor`.

## Known gap

`bone-deep` (secondary-button hover, neutral badge background) is referenced by `components/bundle.css` but is not defined in the tokens, so those two currently render with no background. Define `--bone-deep` (originally #D6C5AE) or swap those two rules to another token.
