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
    <form className="book-form" onSubmit={handleSubmit}>
      <label className="book-form-field">
        <span className="book-form-label">제목</span>
        <input name="title" value={form.title} onChange={handleChange} placeholder="도서 제목을 입력하세요" />
      </label>

      <label className="book-form-field">
        <span className="book-form-label">저자</span>
        <input name="author" value={form.author} onChange={handleChange} placeholder="저자 이름을 입력하세요" />
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
      </label>

      {errorMessage && <p className="book-form-error">{errorMessage}</p>}

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
