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
function BookForm({ initialValues = EMPTY_FORM, onSubmit, submitting = false, serverError = null, submitLabel = '저장' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: initialValues.title,
    author: initialValues.author,
    genre: initialValues.genre,
    content: initialValues.content,
  });
  // 필드별 에러 메시지 (불변성: 기존 객체 복사 후 해당 필드만 교체)
  const [errors, setErrors] = useState(EMPTY_ERRORS);

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
    <form className="book-form" onSubmit={handleSubmit}>
      <label className="book-form-field">
        <span className="book-form-label">제목</span>
        <input name="title" value={form.title} onChange={handleChange} placeholder="도서 제목을 입력하세요" />
        {errors.title && <p className="book-form-error">{errors.title}</p>}
      </label>

      <label className="book-form-field">
        <span className="book-form-label">저자</span>
        <input name="author" value={form.author} onChange={handleChange} placeholder="저자 이름을 입력하세요" />
        {errors.author && <p className="book-form-error">{errors.author}</p>}
      </label>

      <label className="book-form-field">
        <span className="book-form-label">장르</span>
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
        <span className="book-form-label">내용</span>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={8}
          placeholder="글의 분위기와 배경이 드러나게 써 주세요. AI 표지 생성에 사용됩니다."
        />
        {errors.content && <p className="book-form-error">{errors.content}</p>}
      </label>

      {serverError && <p className="book-form-error">{serverError}</p>}

      <div className="book-form-actions">
        {/* 취소: 이전 화면으로 돌아가기 */}
        <button type="button" className="btn" onClick={() => navigate(-1)} disabled={submitting}>
          취소
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? '저장 중...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
