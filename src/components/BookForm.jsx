import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../constants/genres.js';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', genre: '', content: '' };
const EMPTY_ERRORS = { title: '', author: '', genre: '', content: '' };

// 등록/수정 공통 폼
// - initialValues: 수정 페이지에서 기존 도서 값으로 채울 때 사용
// - onSubmit(data): 페이지에서 POST/PATCH를 처리하는 async 함수
// - submitting: 요청 중 여부 (버튼 비활성화에 사용)
// - serverError: 서버/네트워크 에러 메시지 (페이지에서 전달)
// - coverImageUrl: (등록 화면) AI로 만든 표지. 있으면 미리보기에 표시
// - onOpenCoverGenerator(values): (등록 화면) [AI 표지 만들기]를 누르면 입력 중인 값으로 부른다
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
  // 필드별 에러 메시지 (불변성: 기존 객체 복사 후 해당 필드만 교체)
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  // AI 표지는 제목·저자·장르·내용이 모두 있어야 프롬프트를 만들 수 있다
  const canMakeCover = Boolean(
    onOpenCoverGenerator && form.title.trim() && form.author.trim() && form.genre && form.content.trim(),
  );

  // [AI 표지 만들기]: 입력 중인 값(공백 제거)을 페이지에 넘겨 모달을 연다
  const handleOpenCoverGenerator = () => {
    onOpenCoverGenerator({
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre,
      content: form.content.trim(),
    });
  };

  // 입력값 변경: 불변성 유지 + 해당 필드 에러만 초기화
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 모든 필드를 한 번에 검사해 에러 객체 구성
    const newErrors = { ...EMPTY_ERRORS };

    if (!form.title.trim())            newErrors.title = '제목을 입력해 주세요.';
    else if (form.title.length > 50)   newErrors.title = '제목은 50자 이하로 입력해 주세요.';

    if (!form.author.trim())           newErrors.author = '저자를 입력해 주세요.';

    if (!form.genre)                   newErrors.genre = '장르를 선택해 주세요.';

    if (!form.content.trim())          newErrors.content = '내용을 입력해 주세요.';
    else if (form.content.trim().length < 10) newErrors.content = '내용을 10자 이상 입력해 주세요.';

    // 하나라도 에러가 있으면 중단
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    // trim 처리된 값을 전달 (불변성: 기존 form 복사 후 필드 교체)
    onSubmit({ ...form, title: form.title.trim(), author: form.author.trim(), content: form.content.trim() });
  };

  return (
    <form className={`book-form${isNew ? ' book-form-create' : ''}`} onSubmit={handleSubmit}>
      {/* 폼 위 안내 영역 통째로 숨김 (빈 칸 공백 제거). 비교하려면 아래 4줄(isNew 2줄 + div 2줄)의 주석을 함께 풀기 */}
      {/* {isNew && ( */}
        {/* <div className="book-form-intro"> */}
          {/* <span className="book-form-step">01 / YOUR BOOK</span> */}
          {/* <h2>첫 페이지를 열어볼까요?</h2> */}
          {/* <p>아래 내용을 채우면 나만의 책이 도서 목록에 올라갑니다.</p> */}
        {/* </div> */}
      {/* )} */}
      <label className="book-form-field">
        <span className="book-form-label">{isNew && <small>01</small>} 제목 {isNew && <span className="required" aria-label="필수">*</span>}</span>
        <input name="title" value={form.title} onChange={handleChange} placeholder="도서 제목을 입력하세요" />
        {errors.title && <p className="book-form-error">{errors.title}</p>}
        {isNew && <span className="book-form-hint">책의 첫인상이 될 이름을 지어주세요.</span>}
      </label>

      <label className="book-form-field">
        <span className="book-form-label">{isNew && <small>02</small>} 저자 {isNew && <span className="required" aria-label="필수">*</span>}</span>
        <input name="author" value={form.author} onChange={handleChange} placeholder={isNew ? '책에 남길 당신의 이름' : '저자 이름을 입력하세요'} />
        {errors.author && <p className="book-form-error">{errors.author}</p>}
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
        {errors.genre && <p className="book-form-error">{errors.genre}</p>}
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
        {errors.content && <p className="book-form-error">{errors.content}</p>}
        {isNew && <span className="book-form-hint">글의 분위기와 배경을 담아보세요.</span>}
      </label>

      {serverError && <p className="book-form-error">{serverError}</p>}

      <div className="book-form-actions">
        {/* 취소: 등록은 도서 목록으로, 수정은 이전 화면으로 돌아가기 */}
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
          {coverImageUrl ? (
            // AI 표지를 골랐으면 CSS 미리보기 대신 실제 표지 이미지를 보여준다
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
          {/* AI 표지 만들기: 네 항목을 모두 입력해야 누를 수 있다. 고른 표지는 등록할 때 함께 저장 */}
          <button
            type="button"
            className="btn btn-primary preview-ai"
            onClick={handleOpenCoverGenerator}
            disabled={!canMakeCover || submitting}
            title={canMakeCover ? undefined : '제목·저자·장르·내용을 입력하면 만들 수 있어요'}
          >
            {coverImageUrl ? 'AI 표지 다시 만들기' : 'AI 표지 만들기'}
          </button>
        </aside>
      )}
    </form>
  );
}

export default BookForm;
