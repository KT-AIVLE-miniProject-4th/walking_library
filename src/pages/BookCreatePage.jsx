import BookForm from '../components/BookForm.jsx';
import './BookCreatePage.css';

// 신규 도서 등록 (저장 동작은 2일차 M4에서 구현)
function BookCreatePage() {
  return (
    <section className="book-create">
      <h1 className="page-title">새 도서 등록</h1>
      <BookForm submitLabel="등록" />
    </section>
  );
}

export default BookCreatePage;
