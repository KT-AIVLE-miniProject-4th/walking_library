import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import BookListPage from './pages/BookListPage.jsx';
import BookCreatePage from './pages/BookCreatePage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import BookEditPage from './pages/BookEditPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { getBooks } from './api/books.js';

// books state를 App에서 관리해 등록·수정·삭제 후 state 갱신
function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBooks()
      .then((data) => {
        // 최신 등록순 정렬 (원본 배열을 바꾸지 않도록 복사)
        setBooks([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // POST 완료 후 응답(id 포함)을 목록 맨 앞에 추가 (불변성: 기존 배열 복사)
  const handleBookCreated = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  // PATCH 완료 후 응답으로 해당 항목 교체 (불변성: map으로 새 배열 생성)
  const handleBookUpdated = (updatedBook) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  // DELETE 완료 후 해당 항목 제거 (불변성: filter로 새 배열 생성)
  const handleBookDeleted = (deletedId) => {
    setBooks((prev) => prev.filter((b) => b.id !== deletedId));
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BookListPage books={books} loading={loading} error={error} />} />
        <Route path="/books/new" element={<BookCreatePage onBookCreated={handleBookCreated} />} />
        <Route path="/books/:id" element={<BookDetailPage onBookDeleted={handleBookDeleted} onBookUpdated={handleBookUpdated} />} />
        <Route path="/books/:id/edit" element={<BookEditPage onBookUpdated={handleBookUpdated} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
