import { Link, NavLink } from 'react-router-dom';
import logoIcon from '../assets/책임 아이콘.png';
import './Header.css';

// 상단 헤더: 서비스 이름(→ 목록) + 네비게이션
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          {/* 로고·서비스 이름도 [도서 목록]과 같이 도서 목록(#book-list) 위치로 이동 */}
          <Link to={{ pathname: '/', hash: '#book-list' }} className="header-logo">
            <img src={logoIcon} alt="" className="header-logo-icon" />
            책임
          </Link>
          <span className="header-subtitle">
            ; 당신의 이야기를 책으로, 책임.
          </span>
        </div>
        <nav className="header-nav">
          {/* 어느 페이지에서 눌러도 첫 화면의 도서 목록(#book-list) 위치로 이동 */}
          <Link to={{ pathname: '/', hash: '#book-list' }} className="header-link">
            도서 목록
          </Link>
          <NavLink to="/books/new" className="btn btn-primary">
            새 도서 등록
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
