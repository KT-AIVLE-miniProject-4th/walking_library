import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import CoverGenerator from '../components/CoverGenerator.jsx';
import { getBook, updateBook } from '../api/books.js';
import './BookCreatePage.css';
import './BookEditPage.css';

function BookEditPage({ onBookUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverDraft, setCoverDraft] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBook(id)
      .then((data) => {
        setBook(data);
        setCoverImageUrl(data.coverImageUrl || '');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUseCover = async (imageUrl) => {
    setCoverImageUrl(imageUrl);
    setCoverDraft(null);
  };

  const handleSubmit = async (formData) => {
    const patch = {};
    if (formData.title !== book.title) patch.title = formData.title;
    if (formData.author !== book.author) patch.author = formData.author;
    if (formData.genre !== book.genre) patch.genre = formData.genre;
    if (formData.content !== book.content) patch.content = formData.content;
    if (coverImageUrl !== (book.coverImageUrl || '')) patch.coverImageUrl = coverImageUrl;

    if (Object.keys(patch).length === 0) {
      navigate(`/books/${id}`);
      return;
    }
    patch.updatedAt = new Date().toISOString();

    setSubmitting(true);
    setServerError(null);
    try {
      const updatedBook = await updateBook(id, patch);
      onBookUpdated(updatedBook);
      navigate(`/books/${id}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="empty-state">불러오는 중...</p>;

  if (error) {
    return (
      <div className="empty-state">
        <p>도서를 불러오지 못했어요: {error}</p>
        <Link to="/" className="btn">목록으로 돌아가기</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="empty-state">
        <p>도서를 찾을 수 없어요.</p>
        <Link to="/" className="btn">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <section className="book-create book-edit">
      <div className="book-create-heading">
        <span className="book-create-eyebrow">REVISE YOUR STORY <span>✳</span> EDIT YOUR BOOK</span>
        <h1>당신의 이야기를 다시 다듬는 시간</h1>
        <p>고치고 싶은 부분을 바꾸고 저장하면 바로 반영돼요.</p>
      </div>
      <BookForm
        key={book.id}
        initialValues={book}
        submitLabel="수정 내용 저장하기"
        onSubmit={handleSubmit}
        submitting={submitting}
        serverError={serverError}
        coverImageUrl={coverImageUrl}
        onOpenCoverGenerator={setCoverDraft}
      />

      {coverDraft && (
        <CoverGenerator book={coverDraft} onClose={() => setCoverDraft(null)} onUseCover={handleUseCover} />
      )}
    </section>
  );
}

export default BookEditPage;
