import { useEffect, useState } from 'react';
import { generateCover } from '../api/openai.js';
import { buildCoverPrompt } from '../utils/buildCoverPrompt.js';
import './CoverGenerator.css';

const QUALITIES = ['low', 'medium', 'high', 'auto'];
const FORMATS = ['png', 'jpeg', 'webp'];

// 표지 크기는 모두 세로 2:3 → 목록·상세의 2:3 표지 틀에 잘리지 않고 딱 맞는다
const DEFAULT_SIZE = '1024x1536';
const SIZE_LABELS = {
  '768x1152': '768 × 1152 (작게, 빠름)',
  '1024x1536': '1024 × 1536 (기본)',
  '1280x1920': '1280 × 1920 (크게, 비용 ↑)',
};
const FLEXIBLE_SIZES = ['768x1152', '1024x1536', '1280x1920']; // 자유 크기 지원 모델용
const FIXED_SIZES = [DEFAULT_SIZE]; // 정해진 크기만 되는 모델은 세로형이 1024x1536 하나뿐

// 생성 모델별로 고를 수 있는 크기 (OpenAI 문서 기준)
const MODELS = [
  { id: 'gpt-image-2', label: 'gpt-image-2 (기본)', sizes: FLEXIBLE_SIZES },
  { id: 'gpt-image-2.5-flare', label: 'gpt-image-2.5-flare (빠름)', sizes: FLEXIBLE_SIZES },
  { id: 'gpt-image-1-mini', label: 'gpt-image-1-mini (저렴)', sizes: FIXED_SIZES },
];

function CoverGenerator({ book, onClose, onUseCover }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(MODELS[0].id);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [quality, setQuality] = useState('low');
  const [outputFormat, setOutputFormat] = useState('png');
  const [prompt, setPrompt] = useState(() => buildCoverPrompt(book));
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const canGenerate = apiKey.trim() !== '' && prompt.trim() !== '' && !generating && !saving;

  const sizeOptions = MODELS.find((m) => m.id === model).sizes;

  // 모델을 바꿀 때, 새 모델이 지원하지 않는 크기였다면 기본 크기로 되돌린다
  const handleModelChange = (e) => {
    const nextModel = e.target.value;
    const nextSizes = MODELS.find((m) => m.id === nextModel).sizes;
    setModel(nextModel);
    if (!nextSizes.includes(size)) setSize(DEFAULT_SIZE);
  };

  // [이 표지 사용]: 페이지에 저장을 맡긴다. 성공하면 페이지가 모달을 닫는다
  const handleUseCover = async () => {
    setSaving(true);
    setError(null);
    try {
      await onUseCover(imageUrl);
    } catch (err) {
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
      const url = await generateCover({ apiKey: apiKey.trim(), prompt, model, size, quality, outputFormat });
      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="cover-modal-backdrop" onClick={onClose}>
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
                <span className="cover-label">생성 모델 (model)</span>
                <select value={model} onChange={handleModelChange}>
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cover-field">
                <span className="cover-label">이미지 크기 (세로 2:3)</span>
                {/* 크기가 하나뿐인 모델은 고정으로 표시 */}
                <select value={size} onChange={(e) => setSize(e.target.value)} disabled={sizeOptions.length === 1}>
                  {sizeOptions.map((s) => (
                    <option key={s} value={s}>
                      {SIZE_LABELS[s]}
                    </option>
                  ))}
                </select>
              </label>

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

            <p className="cover-notice">⚠ 생성할 때마다 OpenAI 비용이 발생해요. 크기와 품질이 높을수록 비용이 커져요.</p>

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
