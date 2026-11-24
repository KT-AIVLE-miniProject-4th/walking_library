import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoIcon from '../assets/책임 아이콘.png';
import './Header.css';

function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [overHero, setOverHero] = useState(false);
  
  useEffect(() => {
    if (pathname !== '/') return;

    const update = () => {
      const hero = document.querySelector('.hero');
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setOverHero(Boolean(hero) && hero.getBoundingClientRect().bottom > headerHeight);
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const handleBrandClick = () => {
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const transparent = pathname === '/' && overHero;

  return (
    <header ref={headerRef} className={`header${transparent ? ' header-transparent' : ''}`}>
      <div className="header-inner">
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
