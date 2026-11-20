# TextInput

52px text field on bone with a 1px `cafe-noir-muted` border and 16px × 18px padding.

- `type="email"` for newsletter sign-up; `type="search"` uses the `line-strong` hairline and leaves 50px on the right for a round search icon button.
- Hover tints the background with `overlay` and darkens the border to `cafe-noir`. Focus: 2px `focus-ring` outline.
- Typed text, label and placeholder are all `cafe-noir` (8.0:1).
- Examples: label "이메일", placeholder "이메일 주소를 입력하세요"; search placeholder "상품 검색".
- Consumer provides `label` (optional, renders above), `placeholder`, `value` / `onChange`.
