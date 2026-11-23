import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard.jsx';
import newBookIcon from '../assets/책임 아이콘.png';
import './BookListPage.css';

// 첫 페이지: 화면을 꽉 채우는 대표 사진(hero) + 아래로 스크롤하면 도서 목록
// books, loading, error는 App에서 관리하며 props로 전달받는다. 그리고 렌더링
function BookListPage({ books, loading, error }) {

  return (
    <>
      {/* 대표 사진 영역: 사진 파일은 public/hero.jpg */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">책임</h1>
          <p className="hero-text">누구나 작가가 되어 글을 쓰고, 이야기에 어울리는 표지를 만드는 곳</p>
          {/* 가운데 아이콘 버튼: 누르면 새 도서 등록 페이지로 이동
          <Link to="/books/new" className="hero-new-book">
            <img src={newBookIcon} alt="새 도서 등록하기" />
          </Link> */}
          <Link to="/books/new" className="hero-create-btn">
            <span aria-hidden="true">✎</span>
            나만의 이야기 쓰기
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {/* 같은 페이지 안의 목록 위치로 이동하는 링크라서 Link가 아닌 a 태그 사용 */}
        <a href="#book-list" className="hero-scroll">
          도서 보기 ↓
        </a>
      </section>

      {/* 도서 목록: 사진 아래로 스크롤하면 보인다 */}
      <section id="book-list" className="book-list">
        <h2 className="page-title">도서 목록</h2>

        {loading && <p className="empty-state">불러오는 중...</p>}
        {error && <p className="empty-state">오류가 발생했어요: {error}</p>}
        {!loading && !error && books.length === 0 && (
          <p className="empty-state">등록된 도서가 없어요.</p>
        )}
        {!loading && !error && books.length > 0 && (
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default BookListPage;
