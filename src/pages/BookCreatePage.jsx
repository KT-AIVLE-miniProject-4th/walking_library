import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import CoverGenerator from '../components/CoverGenerator.jsx';
import { createBook } from '../api/books.js';
import './BookCreatePage.css';

// 신규 도서 등록: POST /books
// onBookCreated: 등록 완료 후 App의 books state에 새 항목을 추가하는 콜백
function BookCreatePage({ onBookCreated }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverDraft, setCoverDraft] = useState(null);

  // [이 표지 사용]: 아직 등록 전이라 서버에 저장하지 않고 보관만 → 등록할 때 함께 POST
  const handleUseCover = async (imageUrl) => {
    setCoverImageUrl(imageUrl);
    setCoverDraft(null);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const newBook = await createBook({
        ...formData,
        coverImageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
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
        coverImageUrl={coverImageUrl}
        onOpenCoverGenerator={setCoverDraft}
      />

      {/* AI 표지 생성 모달 */}
      {coverDraft && (
        <CoverGenerator book={coverDraft} onClose={() => setCoverDraft(null)} onUseCover={handleUseCover} />
      )}
    </section>
  );
}

export default BookCreatePage;
