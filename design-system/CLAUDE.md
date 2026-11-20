# Design system

All UI in this project uses the **Bone & Kombu** design system in `design-system/`.

- Before building or styling any UI, read `design-system/README.md`, then the README of each component you use in `design-system/components/<Comp>/README.md`.
- Load `design-system/tokens.css` then `design-system/components/bundle.css` on every page.
- Use only the CSS variables from `tokens.css` for colour, spacing, radius, border and shadow. Never hard-code hex values, and never use pure black (#000) or pure white backgrounds: text is `var(--cafe-noir)`, the page is `var(--bone)`, primary actions are `var(--kombu-green)` with `var(--on-primary)` text.
- Reuse the existing classes (`bk-btn`, `bk-btn-primary`, `bk-input`, `bk-select`, `bk-badge`) or the `BoneKombu` React components instead of building new controls.
- Font is `var(--font-sans)` (Helvetica Neue + Pretendard for Korean). Korean pages get `<html lang="ko">` and body line-height 1.6.
- UI copy is Korean by default; button labels end in …하기 / …담기 / …보기, no exclamation marks.
- If a needed token or component doesn't exist, add it to `design-system/tokens.json` and `tokens.css` first, then use it.

## walking_library 앱에 적용하는 방법

- 앱(src/)은 `tokens.css`를 직접 불러오지 않는다. 토큰 값을 `src/index.css`의 `:root`에 옮겨 적고, 앱의 기존 변수 이름(`--color-primary`, `--space-4` 등)을 그대로 쓴다.
- 따라서 앱 코드에서는 루트 CLAUDE.md 규칙대로 `src/index.css` 변수만 사용한다. 토큰 값이 바뀌면 `src/index.css`의 `:root`도 함께 고친다.
- `bundle.js`(React 18 전역)는 앱에서 불러오지 않는다.
