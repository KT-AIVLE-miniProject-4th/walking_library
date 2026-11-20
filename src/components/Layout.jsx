import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import './Layout.css';

// 공통 레이아웃: 상단 Header + 페이지 본문(main)
function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
