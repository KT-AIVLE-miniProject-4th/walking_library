import BookCard from '../components/BookCard.jsx';
import { mockBooks } from '../mock/books.js';
import './BookListPage.css';

// 도서 목록 (1일차: Mock 데이터 / 2일차 M3에서 GET /books로 교체)
function BookListPage() {
  // 최신 등록순 정렬 (원본 배열을 바꾸지 않도록 복사 후 정렬)
  const books = [...mockBooks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <section>
      <h1 className="page-title">도서 목록</h1>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BookListPage;
