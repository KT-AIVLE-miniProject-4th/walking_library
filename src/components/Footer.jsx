import './Footer.css';

// 팀원 이름 (푸터 맨 아래 줄에 이 순서대로 표시)
const TEAM_MEMBERS = ['신희진', '전용제', '김건우', '홍수진', '박주영', '이준혁'];

// 하단 푸터: 왼쪽 KT AIVLE 프로젝트 정보 + GitHub / 오른쪽 서비스 이름·부제 / 맨 아래 팀원 이름
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-info">
          <p className="footer-title">KT AIVLE School</p>
          <p className="footer-desc">4차 미니프로젝트 · 3반 11조</p>
          {/* 외부 사이트(GitHub)로 가는 링크라서 Link가 아닌 a 태그 사용 */}
          <a
            href="https://github.com/KT-AIVLE-miniProject-4th/walking_library"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </div>

        <div className="footer-brand">
          <p className="footer-title">책임</p>
          <p className="footer-desc">이야기에 어울리는 표지를 만드는 도서관리 시스템</p>
        </div>
      </div>

      <p className="footer-bottom">팀원 {TEAM_MEMBERS.join(' · ')}</p>
    </footer>
  );
}

export default Footer;
