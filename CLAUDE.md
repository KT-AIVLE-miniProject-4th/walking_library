# 프로젝트 규칙

- KT AIVLE 4차 미니프로젝트 (3반 11조). 1일차 기획+뼈대, 2일차 CRUD(fetch), 3일차 OpenAI 표지 생성+저장+발표
- 팀 저장소: https://github.com/KT-AIVLE-miniProject-4th/walking_library (main 브랜치)
- 스택: React 19 + Vite, JavaScript, react-router-dom, fetch(axios 금지), json-server 0.17.4, 순수 CSS + CSS 변수
- 요청한 일차 범위 밖의 기능은 미리 구현하지 않는다
- 서버 주소는 src/api/config.js의 API_URL만 사용한다
- 도서 필드: id, title, author, genre, content, coverImageUrl, createdAt, updatedAt (장르 목록은 src/constants/genres.js만 사용)
- 상태 업데이트는 불변성 패턴: 추가 [...arr, x] / 수정 map / 삭제 filter
- OpenAI API Key는 코드·파일·localStorage에 절대 저장하지 않고, 화면의 password input으로만 받는다
- 색상·간격·글자 크기는 index.css CSS 변수만 사용한다
- 주석과 설명은 한국어. 작업이 끝나면 바뀐 파일과 각 파일의 역할을 짧게 설명한다
- 커밋 메시지는 한국어, "feat: ..." / "fix: ..." / "docs: ..." 형식. push 전에는 항상 git pull --rebase
