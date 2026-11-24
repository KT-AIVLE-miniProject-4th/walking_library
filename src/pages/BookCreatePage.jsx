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
  // AI 표지: 고른 표지(Data URL)와, 모달을 열 때 넘길 입력값 (null이면 모달 닫힘)
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
      // 응답으로 id 포함된 객체 수신
      const newBook = await createBook({
        ...formData,
        coverImageUrl, // AI 표지를 골랐으면 그 Data URL, 아니면 ''
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
        coverImageUrl={coverImageUrl}
        onOpenCoverGenerator={setCoverDraft}
      />

      {/* AI 표지 생성 모달: BookForm(<form>) 바깥에 둬야 모달 안의 생성 버튼이 도서 등록을 실행하지 않는다 */}
      {coverDraft && (
        <CoverGenerator book={coverDraft} onClose={() => setCoverDraft(null)} onUseCover={handleUseCover} />
      )}
    </section>
  );
}

export default BookCreatePage;
