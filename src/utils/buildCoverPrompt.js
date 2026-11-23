// 도서 정보(제목·저자·장르·내용)로 OpenAI에 보낼 한국어 표지 프롬프트를 만든다.

// 장르별 분위기 키워드 (키는 src/constants/genres.js의 장르 이름과 같아야 한다)
const GENRE_MOODS = {
  소설: '여운이 남는, 영화 같은, 감정이 겹겹이 쌓인',
  에세이: '차분하고 사색적인, 따뜻한 자연광, 미니멀한',
  시: '서정적이고 몽환적인, 상징적인, 부드러운 파스텔 톤',
  판타지: '신비롭고 웅장한, 마법 같은 빛, 풍부한 디테일',
  SF: '미래적이고 광활한, 차가운 파랑·은색 톤, 경이로운',
  '추리/스릴러': '어둡고 긴장감 있는, 짙은 그림자, 강한 명암 대비',
  로맨스: '따뜻하고 다정한, 부드러운 금빛 조명, 친밀한',
  자기계발: '밝고 희망찬, 깔끔하고 단순한, 현대적인',
  기타: '예술적이고 균형 잡힌, 편안한',
};

const SUMMARY_MAX = 600; // 프롬프트가 너무 길어지지 않도록 내용은 앞부분만 사용

export function buildCoverPrompt({ title, author, genre, content }) {
  const mood = GENRE_MOODS[genre] ?? GENRE_MOODS['기타'];
  const text = content.trim();
  const summary = text.length > SUMMARY_MAX ? `${text.slice(0, SUMMARY_MAX)}...` : text;

  return [
    `${author} 작가의 ${genre} 장르 책 "${title}"의 표지 일러스트를 그려 주세요.`,
    `분위기와 스타일: ${mood}.`,
    `줄거리: ${summary}`,
    '이야기의 배경, 분위기, 핵심 이미지를 담아서 한눈에 장르가 느껴지게 해 주세요.',
    '세로 2:3 비율의 책 표지, 여백 없이 화면을 가득 채운 고품질 그림.',
    `글자: 표지에는 제목 "${title}"만 넣고, 작가 이름이나 그 밖의 글자·로고·워터마크는 넣지 마세요.`,
  ].join('\n');
}
