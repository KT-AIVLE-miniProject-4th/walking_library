import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../constants/genres.js';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', genre: '', content: '' };

// 등록/수정 공통 폼
// - initialValues: 수정 페이지에서 기존 도서 값으로 채울 때 사용
function BookForm({ initialValues = EMPTY_FORM, submitLabel = '저장' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: initialValues.title,
    author: initialValues.author,
    genre: initialValues.genre,
    content: initialValues.content,
  });

  // 입력값 변경: 불변성 유지 (기존 객체 복사 후 해당 필드만 교체)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 2일차 M4에서 구현 (입력 검사 + POST/PATCH 후 화면 이동)
  };

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
        {/* AI 표지 생성: 3일차 M5에서 구현 */}
        <button type="button" className="btn btn-primary" disabled>
          AI 표지 생성
        </button>

      <div className="book-form-actions">
        {/* 취소: 이전 화면으로 돌아가기 */}
        <button type="button" className="btn" onClick={() => navigate(-1)}>
          취소
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        
      </div>
    </form>
  );
}

export default BookForm;
