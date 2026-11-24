// OpenAI 이미지 생성 API 호출
const OPENAI_IMAGE_URL = 'https://api.openai.com/v1/images/generations';

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
        n: 1,
        size,
        quality,
        output_format: outputFormat,
      }),
    });
  } catch {
    throw new Error('네트워크 오류로 요청하지 못했어요. 인터넷 연결을 확인해 주세요');
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) throw new Error('API Key를 확인해 주세요');
    if (res.status === 429) throw new Error('사용량 한도에 걸렸어요. 잠시 후 다시 시도해 주세요');
    throw new Error(data?.error?.message || `요청에 실패했어요 (${res.status})`);
  }

  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error('응답 형식이 예상과 달라요');

  return `data:image/${outputFormat};base64,${b64}`;
}
