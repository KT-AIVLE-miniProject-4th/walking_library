# Button

52px action button with 5px corners and a 2px outline; secondary is the default.

- **Primary** (`variant="primary"`): `kombu-green` fill, white `on-primary` text (11.0:1). At most once per view — "장바구니 담기", "구매하기" (Add to cart, Checkout).
- **Secondary**: transparent on bone, 2px `line` outline, `cafe-noir` text; hover fills `bone-deep`.
- **Pill** (`pill`): same variants with `radius-pill`, for filters and newsletter forms.
- Hover darkens to `kombu-green-hover` in 0.15s ease-in-out. Focus: 2px `focus-ring` outline, 2px offset.
- Consumer provides the label and `onClick`. Korean labels are short noun + verb phrases ending in …하기 / …담기 / …보기 ("장바구니 담기", "사이즈 가이드", "구독하기", "신상품 보기"); no 요/니다 endings, no exclamation marks. English labels: verb first, sentence case.
