import { useEffect, useState } from 'react';
import { generateCover } from '../api/openai.js';
import { buildCoverPrompt } from '../utils/buildCoverPrompt.js';
import './CoverGenerator.css';

const QUALITIES = ['low', 'medium', 'high', 'auto'];
const FORMATS = ['png', 'jpeg', 'webp'];

// AI 표지 생성 모달 (상세 페이지에서 연다)
// - book: 표지를 만들 도서
// - onClose: 모달 닫기
// - onUseCover(imageUrl): [이 표지 사용]을 누르면 부르는 async 함수 (저장은 페이지가 담당)
function CoverGenerator({ book, onClose, onUseCover }) {
  // API Key는 이 컴포넌트의 state에만 있다 → 모달을 닫으면 사라진다 (저장 금지)
  const [apiKey, setApiKey] = useState('');
  const [quality, setQuality] = useState('low');
  const [outputFormat, setOutputFormat] = useState('png');
  // 프롬프트는 처음 열 때 한 번 만들고, 그 뒤로는 사용자가 고칠 수 있다
  const [prompt, setPrompt] = useState(() => buildCoverPrompt(book));
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // 생성된 표지 (Data URL)
  const [saving, setSaving] = useState(false); // [이 표지 사용] 저장 중 여부

  // Esc 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // 정리: 모달이 사라지면 이벤트도 해제
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const canGenerate = apiKey.trim() !== '' && prompt.trim() !== '' && !generating && !saving;

  // [이 표지 사용]: 페이지에 저장을 맡긴다. 성공하면 페이지가 모달을 닫는다
  const handleUseCover = async () => {
    setSaving(true);
    setError(null);
    try {
      await onUseCover(imageUrl);
    } catch (err) {
      // 실패하면 모달에 남아서 다시 시도할 수 있게
      setError(`표지를 저장하지 못했어요: ${err.message}`);
      setSaving(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!canGenerate) return;

    setGenerating(true);
    setError(null);
    try {
      const url = await generateCover({ apiKey: apiKey.trim(), prompt, quality, outputFormat });
      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    // 바깥 어두운 영역을 누르면 닫힌다
    <div className="cover-modal-backdrop" onClick={onClose}>
      {/* 모달 안쪽을 누를 때는 닫히지 않도록 클릭이 바깥으로 전달되는 것을 막는다 */}
      <div
        className="cover-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cover-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="cover-modal-header">
          <h2 id="cover-modal-title">AI 표지 생성</h2>
          <button type="button" className="cover-modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </header>

        <div className="cover-modal-body">
          {/* 왼쪽: 입력 / Enter로도 생성할 수 있도록 form 사용 */}
          <form className="cover-form" onSubmit={handleGenerate}>
            <label className="cover-field">
              <span className="cover-label">OpenAI API Key</span>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                autoComplete="off"
              />
              <span className="cover-hint">키는 이 창에만 잠시 보관되고, 창을 닫으면 사라져요.</span>
            </label>

            <div className="cover-options">
              <label className="cover-field">
                <span className="cover-label">품질 (quality)</span>
                <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                  {QUALITIES.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cover-field">
                <span className="cover-label">형식 (output_format)</span>
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                  {FORMATS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="cover-field">
              <span className="cover-label">프롬프트 (수정 가능)</span>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={9} />
            </label>

            <p className="cover-notice">⚠ 생성할 때마다 OpenAI 비용이 발생해요.</p>

            {error && (
              <p className="cover-error" role="alert">
                {error}
              </p>
            )}

            <div className="cover-actions">
              <button type="submit" className="btn btn-primary" disabled={!canGenerate}>
                {generating && <span className="spinner" aria-hidden="true" />}
                {generating ? '생성 중...' : imageUrl ? '다시 생성' : '표지 생성'}
              </button>
              {/* 이 표지 사용: json-server에 coverImageUrl로 저장 */}
              {imageUrl && (
                <button type="button" className="btn" onClick={handleUseCover} disabled={generating || saving}>
                  {saving && <span className="spinner" aria-hidden="true" />}
                  {saving ? '저장 중...' : '이 표지 사용'}
                </button>
              )}
            </div>
          </form>

          {/* 오른쪽: 결과 미리보기 (2:3 비율) */}
          <div className="cover-preview" aria-live="polite">
            {generating ? (
              <div className="cover-preview-empty">
                <span className="spinner spinner-lg" aria-hidden="true" />
                <p>표지를 그리는 중이에요. 최대 1분 정도 걸려요.</p>
              </div>
            ) : imageUrl ? (
              <img src={imageUrl} alt={`${book.title} AI 생성 표지 미리보기`} />
            ) : (
              <div className="cover-preview-empty">
                <p>생성된 표지가 여기에 보여요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverGenerator;
