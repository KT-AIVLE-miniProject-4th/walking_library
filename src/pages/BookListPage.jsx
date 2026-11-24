import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import GenreFilter from '../components/GenreFilter.jsx';
import { Link, useLocation } from 'react-router-dom';
import { normalizeForSearch } from '../utils/searchKorean.js';
import './BookListPage.css';


function BookListPage({ books, loading, error }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (!loading && location.hash === '#book-list') {
      document.getElementById('book-list')?.scrollIntoView();
    }
  }, [loading, location.key, location.hash]);

  // 자모 분해 + 공백 제거 + 소문자 변환 후 비교
  const keyword = normalizeForSearch(query);
  const filteredBooks = books.filter((book) => {
    const matchesGenre = !genre || book.genre === genre;
    const matchesKeyword =
      !keyword ||
      normalizeForSearch(book.title).includes(keyword) ||
      normalizeForSearch(book.author).includes(keyword);
    return matchesGenre && matchesKeyword;
  });

  const emptyMessage = [genre && `'${genre}' 장르`, keyword && `"${query.trim()}" 검색`]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">책임</h1>
          <p className="hero-text">누구나 작가가 되어 글을 쓰고, 이야기에 어울리는 표지를 만드는 곳</p>
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

      <section id="book-list" className="book-list">
        <div className="book-list-toolbar">
          <h2 className="page-title">
            도서 목록
            {!loading && !error && <span className="book-list-count">{filteredBooks.length}권</span>}
          </h2>
          <SearchBar value={query} onChange={setQuery} />
          <GenreFilter value={genre} onChange={setGenre} />
        </div>

        {loading && <p className="empty-state">불러오는 중...</p>}
        {error && <p className="empty-state">오류가 발생했어요: {error}</p>}
        {!loading && !error && books.length === 0 && (
          <p className="empty-state">등록된 도서가 없어요.</p>
        )}
        {!loading && !error && books.length > 0 && filteredBooks.length === 0 && (
          <p className="empty-state">{emptyMessage} 결과에 맞는 도서가 없어요.</p>
        )}
        {!loading && !error && filteredBooks.length > 0 && (
          <div className="book-grid">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default BookListPage;
