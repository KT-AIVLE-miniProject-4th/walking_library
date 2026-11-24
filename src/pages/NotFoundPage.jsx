import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="empty-state">
      <p className="not-found-code">404</p>
      <p>페이지를 찾을 수 없어요.</p>
      <Link to="/" className="btn btn-primary">
        목록으로
      </Link>
    </div>
  );
}

export default NotFoundPage;
