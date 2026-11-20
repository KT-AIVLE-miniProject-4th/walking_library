import BookCard from '../components/BookCard.jsx';
import { mockBooks } from '../mock/books.js';
import './BookListPage.css';

// 첫 페이지: 화면을 꽉 채우는 대표 사진(hero) + 아래로 스크롤하면 도서 목록
// (1일차: Mock 데이터 / 2일차 M3에서 GET /books로 교체)
function BookListPage() {
  // 최신 등록순 정렬 (원본 배열을 바꾸지 않도록 복사 후 정렬)
  const books = [...mockBooks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      {/* 대표 사진 영역: 사진 파일은 public/hero.jpg */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-sub">작가의 산책</p>
          <h1 className="hero-title">걷기가 서재</h1>
          <p className="hero-text">누구나 작가가 되어 글을 쓰고, 이야기에 어울리는 표지를 만드는 곳</p>
        </div>
        {/* 같은 페이지 안의 목록 위치로 이동하는 링크라서 Link가 아닌 a 태그 사용 */}
        <a href="#book-list" className="hero-scroll">
          도서 보기 ↓
        </a>
      </section>

      {/* 도서 목록: 사진 아래로 스크롤하면 보인다 */}
      <section id="book-list" className="book-list">
        <h2 className="page-title">도서 목록</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}

export default BookListPage;
