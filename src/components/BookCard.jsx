
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate.js';
import './BookCard.css';

// 도서 목록 카드: 기본은 AI 표지, hover/focus 시 간단한 도서 정보 표시
function BookCard({ book }) {
  const summary = (book.content || '').trim();

  return (
    <Link
      to={`/books/${book.id}`}
      className="book-card"
      aria-label={`${book.title} 상세 보기`}
    >
      <div className="book-card-cover">
        {book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={`${book.title} 표지`}
            loading="lazy"
          />
        ) : (
          <div className="book-card-placeholder">
            {book.title}
          </div>
        )}

        {/* 마우스를 올렸을 때 표지 위에 나타나는 정보 */}
        <div className="book-card-overlay" aria-hidden="true">
          <span className="book-card-overlay-genre">
            {book.genre || '도서'}
          </span>

          <h3 className="book-card-overlay-title">
            {book.title}
          </h3>

          <p className="book-card-overlay-author">
            {book.author}
          </p>

          <span className="book-card-overlay-rule" />

          <p className="book-card-overlay-summary">
            {summary || '이 도서의 자세한 이야기를 확인해 보세요.'}
          </p>

          <span className="book-card-overlay-cta">
            도서 자세히 보기 <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>

      {/* 기존 카드 하단 정보 유지 */}
      <div className="book-card-body">
        <div className="book-card-row">
          <h3 className="book-card-title">{book.title}</h3>
          <span className="book-card-genre">{book.genre}</span>
        </div>

        <p className="book-card-meta">
          {book.author} · {formatDate(book.createdAt)} 등록
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
