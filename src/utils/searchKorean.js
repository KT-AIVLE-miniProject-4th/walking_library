// 한글 초성·중성·종성 목록
const ONSET  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const NUCLEUS= ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const CODA   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

// 한글 음절(가~힣)을 초성·중성·종성 자모로 분해한다.
// 한글 외 문자(영문·숫자·기호)는 그대로 반환한다.
function decomposeKorean(str) {
  return str
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code < 0xac00 || code > 0xd7a3) return ch; // 한글 음절 범위 밖
      const offset = code - 0xac00;
      const onset  = Math.floor(offset / (21 * 28));
      const nucleus = Math.floor((offset % (21 * 28)) / 28);
      const coda   = offset % 28;
      return ONSET[onset] + NUCLEUS[nucleus] + CODA[coda];
    })
    .join('');
}

// 검색 비교용 정규화: 소문자 변환 → 공백 제거 → 자모 분해
// 검색어·대상 문자열 모두 이 함수를 거친 뒤 includes()로 비교한다.
export function normalizeForSearch(str) {
  return decomposeKorean(str.toLowerCase().replace(/\s+/g, ''));
}
