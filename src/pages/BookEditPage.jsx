import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import { getBook, updateBook } from '../api/books.js';
import './BookEditPage.css';

// 도서 수정: GET /books/:id로 초기값 로딩 → PATCH /books/:id로 변경 필드만 전송
// onBookUpdated: 수정 완료 후 App의 books state에서 해당 항목을 교체하는 콜백
function BookEditPage({ onBookUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBook(id)
      .then(setBook)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    // 변경된 필드만 추출 (불변성: 빈 객체에 필드 추가)
    const patch = {};
    if (formData.title !== book.title) patch.title = formData.title;
    if (formData.author !== book.author) patch.author = formData.author;
    if (formData.genre !== book.genre) patch.genre = formData.genre;
    if (formData.content !== book.content) patch.content = formData.content;

    // 변경 없으면 그냥 상세로 이동
    if (Object.keys(patch).length === 0) {
      navigate(`/books/${id}`);
      return;
    }
    patch.updatedAt = new Date().toISOString();

    setSubmitting(true);
    setServerError(null);
    try {
      // 응답으로 업데이트된 객체 수신
      const updatedBook = await updateBook(id, patch);
      // 목록 state의 해당 항목 교체
      onBookUpdated(updatedBook);
      navigate(`/books/${id}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="empty-state">불러오는 중...</p>;

  if (error) {
    return (
      <div className="empty-state">
        <p>도서를 불러오지 못했어요: {error}</p>
        <Link to="/" className="btn">목록으로 돌아가기</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="empty-state">
        <p>도서를 찾을 수 없어요.</p>
        <Link to="/" className="btn">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <section className="book-edit">
      <h1 className="page-title">도서 수정</h1>
      {/* key: 다른 도서로 이동하면 폼 상태를 새로 초기화 */}
      <BookForm
        key={book.id}
        initialValues={book}
        submitLabel="수정 완료"
        onSubmit={handleSubmit}
        submitting={submitting}
        serverError={serverError}
      />
    </section>
  );
}

export default BookEditPage;
