import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import BookListPage from './pages/BookListPage.jsx';
import BookCreatePage from './pages/BookCreatePage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import BookEditPage from './pages/BookEditPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// 모든 페이지는 Layout(Header + main) 안에서 렌더링된다.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BookListPage />} />
        <Route path="/books/new" element={<BookCreatePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/books/:id/edit" element={<BookEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
