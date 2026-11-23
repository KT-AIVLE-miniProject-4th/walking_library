import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../constants/genres.js';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', genre: '', content: '' };

// 등록/수정 공통 폼
// - initialValues: 수정 페이지에서 기존 도서 값으로 채울 때 사용
// - onSubmit(data): 페이지에서 POST/PATCH를 처리하는 async 함수
// - submitting: 요청 중 여부 (버튼 비활성화에 사용)
// - serverError: 서버/네트워크 에러 메시지 (페이지에서 전달)
function BookForm({ initialValues = EMPTY_FORM, onSubmit, submitting = false, serverError = null, submitLabel = '저장' }) {
  const navigate = useNavigate();
  const isNew = initialValues.id == null;
  const [form, setForm] = useState({
    title: initialValues.title,
    author: initialValues.author,
    genre: initialValues.genre,
    content: initialValues.content,
  });
  const [fieldError, setFieldError] = useState(null);

  // 입력값 변경: 불변성 유지 (기존 객체 복사 후 해당 필드만 교체)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력 검사: 필수 필드 공백 금지, 장르 미선택 불가
    if (!form.title.trim()) return setFieldError('제목을 입력해 주세요.');
    if (!form.author.trim()) return setFieldError('저자를 입력해 주세요.');
    if (!form.genre) return setFieldError('장르를 선택해 주세요.');
    if (!form.content.trim()) return setFieldError('내용을 입력해 주세요.');
    // trim 처리된 값을 전달 (불변성: 기존 form 복사 후 필드 교체)
    onSubmit({ ...form, title: form.title.trim(), author: form.author.trim(), content: form.content.trim() });
  };

  const errorMessage = fieldError || serverError;

  return (
    <form className={`book-form${isNew ? ' book-form-create' : ''}`} onSubmit={handleSubmit}>
      {isNew && (
        <div className="book-form-intro">
          <span className="book-form-step">01 / YOUR BOOK</span>
          <h2>첫 페이지를 열어볼까요?</h2>
          <p>아래 내용을 채우면 나만의 책이 서재에 올라갑니다.</p>
        </div>
      )}
      <label className="book-form-field">
        <span className="book-form-label">{isNew && <small>01</small>} 제목 {isNew && <span className="required" aria-label="필수">*</span>}</span>
        <input name="title" value={form.title} onChange={handleChange} placeholder="도서 제목을 입력하세요" />
        {isNew && <span className="book-form-hint">책의 첫인상이 될 이름을 지어주세요.</span>}
      </label>

      <label className="book-form-field">
        <span className="book-form-label">{isNew && <small>02</small>} 저자 {isNew && <span className="required" aria-label="필수">*</span>}</span>
        <input name="author" value={form.author} onChange={handleChange} placeholder={isNew ? '책에 남길 당신의 이름' : '저자 이름을 입력하세요'} />
        {isNew && <span className="book-form-hint">독자에게 보여질 작가 이름이에요.</span>}
      </label>

      <label className="book-form-field">
        <span className="book-form-label">{isNew && <small>03</small>} 장르 {isNew && <span className="required" aria-label="필수">*</span>}</span>
        <select name="genre" value={form.genre} onChange={handleChange}>
          <option value="">장르를 선택하세요</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>

      <label className="book-form-field">
        <span className="book-form-label">{isNew && <small>04</small>} 내용 {isNew && <span className="required" aria-label="필수">*</span>}</span>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={8}
          placeholder={isNew ? '첫 문장부터 자유롭게 적어보세요. 당신만의 이야기를 기다리고 있어요.' : '글의 분위기와 배경이 드러나게 써 주세요. AI 표지 생성에 사용됩니다.'}
        />
        {isNew && <span className="book-form-hint">글의 분위기와 배경을 담아보세요.</span>}
      </label>

      {errorMessage && <p className="book-form-error">{errorMessage}</p>}

      <div className="book-form-actions">
        {/* 취소: 등록은 서재로, 수정은 이전 화면으로 돌아가기 */}
        <button type="button" className="btn" onClick={() => navigate(isNew ? '/' : -1)} disabled={submitting}>
          취소
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? '저장 중...' : submitLabel}
        </button>
      </div>
      {isNew && (
        <aside className="book-form-preview" aria-label="표지 미리보기">
          <div className="preview-heading"><span>LIVE PREVIEW</span><span className="preview-dot" /></div>
          <div className="preview-book">
            <div className="preview-book-top">걷기가 서재 <span>·</span> ORIGINAL STORY</div>
            <div className="preview-book-art" aria-hidden="true"><span className="preview-orbit one" /><span className="preview-orbit two" /><span className="preview-orbit three" /><span className="preview-star">✳</span></div>
            <div className="preview-book-bottom"><span>{form.genre || '당신의 장르'}</span><strong>{form.title.trim() || '아직 이름 없는\n당신의 이야기'}</strong><span>지은이 {form.author.trim() || '당신'}</span></div>
          </div>
          <p className="preview-caption">책의 제목과 저자, 장르를 입력하면 이곳에 바로 나타나요.</p>
          <a className="preview-ai" href="#ai-cover-info"><span>✦</span><div><strong>AI 표지 만들기</strong><small>책을 등록한 뒤 상세 화면에서 이용할 수 있어요</small></div><span className="preview-ai-arrow">안내 ↗</span></a>
          <p className="preview-ai-note" id="ai-cover-info">등록 화면에서는 AI 표지를 생성하지 않습니다. 책을 등록한 뒤 상세 화면에서 만들 수 있어요.</p>
        </aside>
      )}
    </form>
  );
}

export default BookForm;
