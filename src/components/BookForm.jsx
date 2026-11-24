import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../constants/genres.js';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', genre: '', content: '' };
const EMPTY_ERRORS = { title: '', author: '', genre: '', content: '' };

function BookForm({
  initialValues = EMPTY_FORM,
  onSubmit,
  submitting = false,
  serverError = null,
  submitLabel = '저장',
  coverImageUrl = '',
  onOpenCoverGenerator,
}) {
  const navigate = useNavigate();
  const isNew = initialValues.id == null;
  const [form, setForm] = useState({
    title: initialValues.title,
    author: initialValues.author,
    genre: initialValues.genre,
    content: initialValues.content,
  });
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  const canMakeCover = Boolean(
    onOpenCoverGenerator && form.title.trim() && form.author.trim() && form.genre && form.content.trim(),
  );

  const handleOpenCoverGenerator = () => {
    onOpenCoverGenerator({
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre,
      content: form.content.trim(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...EMPTY_ERRORS };

    if (!form.title.trim())            newErrors.title = '제목을 입력해 주세요.';
    else if (form.title.length > 50)   newErrors.title = '제목은 50자 이하로 입력해 주세요.';

    if (!form.author.trim())           newErrors.author = '저자를 입력해 주세요.';

    if (!form.genre)                   newErrors.genre = '장르를 선택해 주세요.';

    if (!form.content.trim())          newErrors.content = '내용을 입력해 주세요.';
    else if (form.content.trim().length < 10) newErrors.content = '내용을 10자 이상 입력해 주세요.';

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ ...form, title: form.title.trim(), author: form.author.trim(), content: form.content.trim() });
  };

  return (
    <form className="book-form book-form-create" onSubmit={handleSubmit}>
      <label className="book-form-field">
        <span className="book-form-label"><small>01</small> 제목 <span className="required" aria-label="필수">*</span></span>
        <input name="title" value={form.title} onChange={handleChange} placeholder="도서 제목을 입력하세요" />
        {errors.title && <p className="book-form-error">{errors.title}</p>}
        <span className="book-form-hint">책의 첫인상이 될 이름을 지어주세요.</span>
      </label>

      <label className="book-form-field">
        <span className="book-form-label"><small>02</small> 저자 <span className="required" aria-label="필수">*</span></span>
        <input name="author" value={form.author} onChange={handleChange} placeholder="책에 남길 당신의 이름" />
        {errors.author && <p className="book-form-error">{errors.author}</p>}
        <span className="book-form-hint">독자에게 보여질 작가 이름이에요.</span>
      </label>

      <label className="book-form-field">
        <span className="book-form-label"><small>03</small> 장르 <span className="required" aria-label="필수">*</span></span>
        <select name="genre" value={form.genre} onChange={handleChange}>
          <option value="">장르를 선택하세요</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && <p className="book-form-error">{errors.genre}</p>}
      </label>

      <label className="book-form-field">
        <span className="book-form-label"><small>04</small> 내용 <span className="required" aria-label="필수">*</span></span>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={8}
          placeholder="첫 문장부터 자유롭게 적어보세요. 당신만의 이야기를 기다리고 있어요."
        />
        {errors.content && <p className="book-form-error">{errors.content}</p>}
        <span className="book-form-hint">글의 분위기와 배경을 담아보세요.</span>
      </label>

      {serverError && <p className="book-form-error">{serverError}</p>}

      <div className="book-form-actions">
        <button type="button" className="btn" onClick={() => navigate(isNew ? '/' : -1)} disabled={submitting}>
          취소
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? '저장 중...' : submitLabel}
        </button>
      </div>
      <aside className="book-form-preview" aria-label="표지 미리보기">
        <div className="preview-heading"><span>LIVE PREVIEW</span><span className="preview-dot" /></div>
        {coverImageUrl ? (
          <div className="preview-book preview-book-cover">
            <img src={coverImageUrl} alt={`${form.title.trim() || '새 도서'} AI 표지`} />
          </div>
        ) : (
          <div className="preview-book">
            <div className="preview-book-top">책임 <span>·</span> ORIGINAL STORY</div>
            <div className="preview-book-art" aria-hidden="true"><span className="preview-orbit one" /><span className="preview-orbit two" /><span className="preview-orbit three" /><span className="preview-star">✳</span></div>
            <div className="preview-book-bottom"><span>{form.genre || '당신의 장르'}</span><strong>{form.title.trim() || '아직 이름 없는\n당신의 이야기'}</strong><span>지은이 {form.author.trim() || '당신'}</span></div>
          </div>
        )}
        <p className="preview-caption">책의 제목과 저자, 장르를 입력하면 이곳에 바로 나타나요.</p>
        <button
          type="button"
          className="btn btn-primary preview-ai"
          onClick={handleOpenCoverGenerator}
          disabled={!canMakeCover || submitting}
          title={canMakeCover ? undefined : '제목·저자·장르·내용을 입력하면 만들 수 있어요'}
        >
          {!coverImageUrl ? 'AI 표지 만들기' : isNew ? 'AI 표지 다시 만들기' : 'AI 표지 수정하기'}
        </button>
      </aside>
    </form>
  );
}

export default BookForm;
