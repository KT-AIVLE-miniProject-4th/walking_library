import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate.js';
import './BookCard.css';

// 목록용 도서 카드. 클릭하면 상세 페이지로 이동한다.
// 큰 표지 + 아래 한 줄(제목 왼쪽, 장르 오른쪽) + 저자·등록일
function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="book-card">
      <div className="book-card-cover">
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={`${book.title} 표지`} />
        ) : (
          // 표지가 없으면 제목이 들어간 placeholder
          <div className="book-card-placeholder">{book.title}</div>
        )}
      </div>
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
