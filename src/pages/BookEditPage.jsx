import { Link, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import { mockBooks } from '../mock/books.js';
import './BookEditPage.css';

// 도서 수정 (1일차: Mock 값으로 초기값 채우기 / 저장 동작은 2일차 M4에서 구현)
function BookEditPage() {
  const { id } = useParams();
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
    <section className="book-edit">
      <h1 className="page-title">도서 수정</h1>
      {/* key: 다른 도서로 이동하면 폼 상태를 새로 초기화 */}
      <BookForm key={book.id} initialValues={book} submitLabel="수정 완료" />
    </section>
  );
}

export default BookEditPage;
