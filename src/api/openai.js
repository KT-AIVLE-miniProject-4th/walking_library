// OpenAI 이미지 생성 API 호출
// API Key는 화면(password input)에서 받아 요청 헤더에만 넣는다. 어디에도 저장하지 않는다.
const OPENAI_IMAGE_URL = 'https://api.openai.com/v1/images/generations';

// 표지 이미지를 만들어 Data URL 문자열로 돌려준다
// - model: 'gpt-image-2'(기본) 등 이미지 생성 모델
// - size: 'WIDTHxHEIGHT' (표지는 세로 2:3만 사용, 예: '1024x1536')
// - quality: 'low' | 'medium' | 'high' | 'auto'
// - outputFormat: 'png' | 'jpeg' | 'webp'
export async function generateCover({ apiKey, prompt, model = 'gpt-image-2', size = '1024x1536', quality, outputFormat }) {
  let res;
  try {
    res = await fetch(OPENAI_IMAGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1, // 한 장만
        size, // 세로 2:3 (책 표지 비율)
        quality,
        output_format: outputFormat,
      }),
    });
  } catch {
    // 인터넷 연결이 끊기는 등 요청 자체가 실패한 경우
    throw new Error('네트워크 오류로 요청하지 못했어요. 인터넷 연결을 확인해 주세요');
  }

  // 에러 응답도 JSON이지만, 혹시 JSON이 아니면 null로 둔다
  const data = await res.json().catch(() => null);

  // 상태 코드별 에러 메시지
  if (!res.ok) {
    if (res.status === 401) throw new Error('API Key를 확인해 주세요');
    if (res.status === 429) throw new Error('사용량 한도에 걸렸어요. 잠시 후 다시 시도해 주세요');
    throw new Error(data?.error?.message || `요청에 실패했어요 (${res.status})`);
  }

  // 이미지는 data[0].b64_json에 Base64 문자열로 들어 있다
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error('응답 형식이 예상과 달라요');

  // <img src>에 바로 쓸 수 있도록 Data URL로 변환 (jpeg → image/jpeg)
  return `data:image/${outputFormat};base64,${b64}`;
}
