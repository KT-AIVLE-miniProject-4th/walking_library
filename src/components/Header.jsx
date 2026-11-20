import { Link, NavLink } from 'react-router-dom';
import './Header.css';

// 상단 헤더: 서비스 이름(→ 목록) + 네비게이션
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          걷기가 서재 <span className="header-logo-sub">작가의 산책</span>
        </Link>
        <nav className="header-nav">
          <NavLink to="/" end className="header-link">
            도서 목록
          </NavLink>
          <NavLink to="/books/new" className="btn btn-primary">
            새 도서 등록
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
