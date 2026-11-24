import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoIcon from '../assets/책임 아이콘.png';
import './Header.css';

// 상단 헤더: 서비스 이름(→ 목록) + 네비게이션
// 첫 화면에서 대표 사진(.hero) 위에 있을 때는 투명 배경 + 흰 글자,
// 사진을 지나 스크롤하면(또는 다른 페이지에서는) 불투명한 bone 배경 + 갈색 글자로 바뀐다
function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [overHero, setOverHero] = useState(false); // 헤더가 지금 대표 사진 위에 있는지

  useEffect(() => {
    // 대표 사진이 있는 첫 화면에서만 스크롤을 지켜본다
    if (pathname !== '/') return;

    const update = () => {
      const hero = document.querySelector('.hero');
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      // 사진의 아래쪽 끝이 헤더보다 아래에 있으면 = 헤더가 아직 사진 위에 있다
      setOverHero(Boolean(hero) && hero.getBoundingClientRect().bottom > headerHeight);
    };

    // 화면을 그린 직후 한 번 확인하고, 스크롤·창 크기 변경 때마다 다시 확인
    const frame = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // 정리: 페이지를 떠나면 이벤트 해제
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  // 이미 첫 화면에 있으면 주소가 그대로라 ScrollToTop이 동작하지 않는다 → 직접 맨 위로 부드럽게 스크롤
  const handleBrandClick = () => {
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 다른 페이지에서는 항상 불투명 헤더
  const transparent = pathname === '/' && overHero;

  return (
    <header ref={headerRef} className={`header${transparent ? ' header-transparent' : ''}`}>
      <div className="header-inner">
        {/* 로고·서비스 이름·부제 전체가 하나의 링크: 첫 화면(대표 사진) 맨 위로 이동 */}
        <Link to="/" className="header-brand" onClick={handleBrandClick}>
          <span className="header-logo">
            <img src={logoIcon} alt="" className="header-logo-icon" />
            책임
          </span>
          <span className="header-subtitle">
            ; 당신의 이야기를 책으로, 책임.
          </span>
        </Link>
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
