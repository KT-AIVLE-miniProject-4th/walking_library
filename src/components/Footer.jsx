import { Link } from 'react-router-dom';
import './Footer.css';

// 하단 푸터: 서비스 이름 + 바로가기 + 팀 정보
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">책임</p>
          <p className="footer-desc">이야기에 어울리는 표지를 만드는 도서관리 시스템</p>
        </div>

        <nav className="footer-nav">
          <Link to="/">도서 목록</Link>
          <Link to="/books/new">새 도서 등록</Link>
          {/* 외부 사이트(GitHub)로 가는 링크라서 Link가 아닌 a 태그 사용 */}
          <a
            href="https://github.com/KT-AIVLE-miniProject-4th/walking_library"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>

      <p className="footer-bottom">KT AIVLE School 4차 미니프로젝트 · 3반 11조</p>
    </footer>
  );
}

export default Footer;
