import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import { createBook } from '../api/books.js';
import './BookCreatePage.css';

// 신규 도서 등록: POST /books
// onBookCreated: 등록 완료 후 App의 books state에 새 항목을 추가하는 콜백
function BookCreatePage({ onBookCreated }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setServerError(null);
    try {
      // 응답으로 id 포함된 객체 수신
      const newBook = await createBook({
        ...formData,
        coverImageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      // 목록 state에 새 항목 추가
      onBookCreated(newBook);
      navigate('/');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="book-create">
      <div className="book-create-heading">
        <span className="book-create-eyebrow">YOUR STORY BEGINS HERE <span>✳</span> WRITE YOUR BOOK</span>
        <h1>당신의 이야기가 한 권의 책이 되는 순간</h1>
        <p>이야기를 적어 주세요. 오늘부터 당신도 작가입니다.</p>
      </div>
      <BookForm
        submitLabel="내 책 등록하기"
        onSubmit={handleSubmit}
        submitting={submitting}
        serverError={serverError}
      />
    </section>
  );
}

export default BookCreatePage;
