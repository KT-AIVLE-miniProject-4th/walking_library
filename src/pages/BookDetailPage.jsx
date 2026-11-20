import { Link, useParams } from 'react-router-dom';
import { mockBooks } from '../mock/books.js';
import { formatDate } from '../utils/formatDate.js';
import './BookDetailPage.css';

// 도서 상세 (1일차: Mock 데이터 / 2일차 M3에서 GET /books/:id로 교체)
function BookDetailPage() {
  const { id } = useParams();
  // URL 파라미터는 문자열이므로 숫자로 바꿔서 비교
  const book = mockBooks.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="empty-state">
        <p>도서를 찾을 수 없어요.</p>
        <Link to="/" className="btn">
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
          {/* 삭제: 2일차 M4에서 구현 */}
          <button type="button" className="btn btn-danger" disabled>
            삭제
          </button>
          {/* AI 표지 생성: 3일차 M5에서 구현 */}
          <button type="button" className="btn btn-primary" disabled>
            AI 표지 생성
          </button>
        </div>

        <Link to="/" className="book-detail-back">
          ← 목록으로
        </Link>
      </div>
    </article>
  );
}

export default BookDetailPage;
