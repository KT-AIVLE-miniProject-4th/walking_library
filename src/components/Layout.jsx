import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './Layout.css';
import ScrollToTop from './ScrollToTop.jsx';

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
