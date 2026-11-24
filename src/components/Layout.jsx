import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './Layout.css';
import ScrollToTop from './ScrollToTop.jsx';

// 공통 레이아웃: 상단 Header + 페이지 본문(main) + 하단 Footer
function Layout() {
  return (
    <div className="layout">
      <ScrollToTop />
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
