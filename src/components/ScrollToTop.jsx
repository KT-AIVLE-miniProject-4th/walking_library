import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';

    return () => {
        window.history.scrollRestoration = previous;
    };
    }, []);

  useLayoutEffect(() => {
    // 도서 목록으로 이동하는 해시 링크는 유지
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // 일반 페이지 이동 시 최상단으로 이동
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;