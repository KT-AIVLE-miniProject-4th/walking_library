import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getBook, deleteBook, updateBook } from '../api/books.js';
import { formatDate } from '../utils/formatDate.js';
import CoverGenerator from '../components/CoverGenerator.jsx';
import './BookDetailPage.css';

// 도서 상세: GET /books/:id 로 실제 데이터 조회
// onBookDeleted: 삭제 완료 후 App의 books state에서 해당 항목을 제거하는 콜백
// onBookUpdated: AI 표지 저장 후 App의 books state에서 해당 항목을 교체하는 콜백
function BookDetailPage({ onBookDeleted, onBookUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showCoverGenerator, setShowCoverGenerator] = useState(false); // AI 표지 생성 모달 열림 여부

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBook(id)
      .then(setBook)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`"${book.title}"을(를) 삭제할까요?`)) return;
    setDeleting(true);
    try {
      // DELETE /books/:id — headers·body 없음
      await deleteBook(book.id);
      // 목록 state에서 해당 항목 제거
      onBookDeleted(book.id);
      navigate('/');
    } catch (err) {
      alert(`삭제 실패: ${err.message}`);
      setDeleting(false);
    }
  };

  // [이 표지 사용]: 생성한 표지(Data URL)를 PATCH /books/:id 로 저장
  // 실패하면 에러를 그대로 던져서 모달이 메시지를 보여준다
  const handleUseCover = async (imageUrl) => {
    const updatedBook = await updateBook(book.id, {
      coverImageUrl: imageUrl,
      updatedAt: new Date().toISOString(),
    });
    setBook(updatedBook); // 상세 화면 표지 바로 교체
    onBookUpdated(updatedBook); // 목록 state도 교체 (App에서 map으로 처리)
    setShowCoverGenerator(false);
  };

  if (loading) {
    return <p className="empty-state">불러오는 중...</p>;
  }

  if (error) {
    return (
      <div className="empty-state">
        <p>도서를 불러오지 못했어요: {error}</p>
        <Link to="/#book-list" className="btn">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="empty-state">
        <p>도서를 찾을 수 없어요.</p>
        <Link to="/#book-list" className="btn">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="book-detail">
      <div className="book-detail-cover">
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={`${book.title} 표지`} />
        ) : (
          <div className="book-detail-placeholder">{book.title}</div>
        )}
      </div>

      <div className="book-detail-info">
        <span className="badge">{book.genre}</span>
        <h1 className="book-detail-title">{book.title}</h1>
        <p className="book-detail-author">{book.author}</p>
        <dl className="book-detail-dates">
          <dt>작성일</dt>
          <dd>{formatDate(book.createdAt)}</dd>
          <dt>수정일</dt>
          <dd>{formatDate(book.updatedAt)}</dd>
        </dl>
        <p className="book-detail-content">{book.content}</p>

        <div className="book-detail-actions">
          <Link to={`/books/${book.id}/edit`} className="btn">
            수정
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? '삭제 중...' : '삭제'}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setShowCoverGenerator(true)}>
            AI 표지 생성
          </button>
        </div>

        <Link to="/#book-list" className="book-detail-back">
          ← 목록으로
        </Link>
      </div>

      {/* AI 표지 생성 모달: 열려 있을 때만 화면에 그린다 (닫으면 API Key도 함께 사라짐) */}
      {showCoverGenerator && (
        <CoverGenerator book={book} onClose={() => setShowCoverGenerator(false)} onUseCover={handleUseCover} />
      )}
    </article>
  );
}

export default BookDetailPage;
