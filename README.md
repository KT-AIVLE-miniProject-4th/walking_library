# 📚 책임

> KT AIVLE School AI 트랙 4차 미니프로젝트 · **3반 11조**

**책임**은 누구나 글을 책으로 등록하고 작가가 될 수 있는 창작 플랫폼입니다. React와 로컬 REST API로 도서를 관리하고, 원하는 경우 AI로 표지를 만들어 저장할 수 있습니다.

## 프로젝트 목표

- 도서 등록·목록·상세·수정·삭제 화면과 검색·장르 필터 구현
- `json-server`와 `fetch`로 CRUD 연결
- OpenAI 이미지 생성 API로 책에 어울리는 표지 생성·저장

## 팀 구성

| 이름 | 팀 역할 | 개발 담당 | 주요 업무 |
| --- | --- | --- | --- |
| 신희진 | 조장 | OpenAI 연동 | 팀 총괄, 이미지 생성·표지 저장 |
| 전용제 | 발표자 | PM · 기획 | 요구사항·일정 관리, 프로젝트 세팅, 발표 |
| 박주영 | 검토 담당 | CRUD 연동 | json-server, 도서 API 연동, 코드 검토 |
| 이준혁 | PPT 제작 | UI · 레이아웃 | 공통 컴포넌트, 디자인, 발표 자료 |
| 김건우 | 서기 | 발표 · 문서 | 회의 기록, README, 시연 준비 |
| 홍수진 | 타임키퍼 | 스타일링 · QA | CSS, 반응형, 시나리오 점검 |

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프런트엔드 | React 19, React Router 7, Vite 8, JavaScript, CSS |
| 도서 데이터 | json-server 0.17.4, `db.json`, `fetch` |
| AI 표지 | OpenAI 이미지 생성 API (`gpt-image-2`) |
| 협업 | GitHub, Notion |

별도 백엔드 애플리케이션은 없습니다. 개발 환경에서 `json-server`가 `db.json`을 REST API로 제공합니다.

## 구현된 기능

| 기능 | 구현 내용 | 위치 |
| --- | --- | --- |
| 목록 조회 | 도서 카드, 최신 등록순 정렬, 로딩·오류·빈 목록 안내 | `/` |
| 검색·필터 | 제목·저자 검색과 장르 필터 동시 적용 | `/` |
| 상세 조회 | 본문·표지·장르·작성일·수정일 표시 | `/books/:id` |
| 등록 | 제목·저자·장르·내용 입력 후 POST, 목록으로 이동 | `/books/new` |
| 수정 | 기존 값을 불러와 변경 필드만 PATCH, 수정일 갱신 | `/books/:id/edit` |
| 삭제 | 확인창을 거쳐 DELETE, 목록으로 이동 | `/books/:id` |
| 입력 검사 | 필수값, 제목 50자 이하, 내용 10자 이상; 필드별 오류 | 등록·수정 폼 |
| AI 표지 | 프롬프트 편집, 모델·크기(세로 2:3)·품질·형식 선택, 생성·재생성·미리보기·저장 | 상세·등록 화면 모달 |

등록 화면은 **왼쪽 실시간 표지 미리보기, 오른쪽 입력 폼**입니다. 입력한 제목·저자·장르가 CSS 미리보기에 바로 반영됩니다. 제목·저자·장르·내용을 모두 입력하면 **[AI 표지 만들기]**로 등록 전에 표지를 만들 수 있고, 고른 표지는 미리보기에 표시된 뒤 등록할 때 함께 저장됩니다. 등록한 뒤에는 상세 화면의 **[AI 표지 생성]**으로 표지를 바꿀 수 있습니다.

## 실행 방법

Node.js 22 이상과 npm이 필요합니다. AI 표지를 생성하려면 OpenAI API Key가 필요합니다.

```bash
git clone https://github.com/KT-AIVLE-miniProject-4th/walking_library.git
cd walking_library
npm install
```

각각 다른 터미널에서 실행합니다.

```bash
# 터미널 1: 도서 REST API (http://localhost:3000/books)
npm run server
```

```bash
# 터미널 2: React 개발 서버 (http://localhost:5173)
npm run dev
```

도서 목록과 저장 기능에는 두 프로세스가 모두 필요합니다. `npm run build`로 빌드하고 `npm run lint`로 정적 검사를 실행할 수 있습니다.

## 화면과 코드 구조

| 경로 | 화면 | 주요 동작 |
| --- | --- | --- |
| `/` | 홈·도서 목록 | 대표 이미지, 검색, 장르 선택, 도서 카드, 등록 |
| `/books/new` | 도서 등록 | 실시간 표지 미리보기와 입력 폼 |
| `/books/:id` | 도서 상세 | 본문, 수정·삭제, AI 표지 생성·저장 |
| `/books/:id/edit` | 도서 수정 | 기존 값을 채운 공통 폼 |
| 그 외 | 404 | 목록으로 이동 |

```text
walking_library/
├─ db.json                    # json-server 도서 데이터
├─ docs/planning.md           # 기획서
├─ design-system/             # 디자인 토큰·컴포넌트 참고 자료
└─ src/
   ├─ api/                   # config.js, books.js, openai.js
   ├─ assets/                # 홈 배경 이미지·아이콘
   ├─ constants/genres.js    # 장르 목록
   ├─ utils/                 # 날짜 표시, AI 프롬프트 생성
   ├─ components/            # Layout, BookCard, BookForm, CoverGenerator 등
   ├─ pages/                 # 목록·등록·상세·수정·404 화면
   ├─ App.jsx                # 라우팅·도서 목록 상태
   └─ index.css              # 공통 스타일·디자인 변수
```

색상은 크림·갈색·녹색 계열이며 `src/index.css`의 CSS 변수를 사용합니다. 홈 대표 이미지에는 `src/assets/background.png`를 사용합니다.

## 도서 데이터와 CRUD

`db.json`의 `books` 배열을 `json-server`가 `http://localhost:3000/books`로 제공합니다.

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | number | POST 시 부여되는 식별자 |
| `title` | string | 제목 |
| `author` | string | 저자 |
| `genre` | string | 장르 |
| `content` | string | 본문과 AI 프롬프트 재료 |
| `coverImageUrl` | string | 처음에는 빈 문자열, 저장한 표지는 Data URL |
| `createdAt` | ISO 8601 문자열 | 등록 시각 |
| `updatedAt` | ISO 8601 문자열 | 등록·수정·표지 저장 시각 |

| 작업 | 요청 | 사용 위치 | 성공 후 처리 |
| --- | --- | --- | --- |
| 목록 조회 | `GET /books` | `App.jsx` | 최신순 정렬해 목록 상태 저장 |
| 상세 조회 | `GET /books/:id` | `BookDetailPage`, `BookEditPage` | 상세 표시·수정 폼 초기화 |
| 등록 | `POST /books` | `BookCreatePage` | 새 도서를 목록 맨 앞에 추가 |
| 수정 | `PATCH /books/:id` | `BookEditPage` | 변경 필드와 `updatedAt` 전송, 항목 교체 |
| 표지 저장 | `PATCH /books/:id` | `BookDetailPage` | `coverImageUrl`·`updatedAt` 갱신 |
| 삭제 | `DELETE /books/:id` | `BookDetailPage` | 목록에서 항목 제거 |

요청 함수는 `src/api/books.js`에 모았고 주소는 `src/api/config.js`의 `API_URL`을 사용합니다. `App.jsx`가 목록 상태를 관리하며 등록은 `[newBook, ...prev]`, 수정은 `map`, 삭제는 `filter`로 새 배열을 만들어 반영합니다. 검색·장르 필터는 목록 상태에 `filter`를 적용합니다. 요청 실패 시 오류를 표시하고 저장 중에는 중복 제출을 막습니다.

## AI 표지 생성 흐름

1. 도서 상세 화면의 **[AI 표지 생성]** 또는 새 도서 등록 화면의 **[AI 표지 만들기]**를 누릅니다.
2. API Key를 입력하고 자동 작성된 프롬프트를 필요하면 수정합니다. 프롬프트에는 제목·저자·장르와 본문 앞 600자가 포함됩니다.
3. 모델, 크기, 품질(`low`, `medium`, `high`, `auto`), 형식(`png`, `jpeg`, `webp`)을 선택해 생성합니다. 결과를 미리 보거나 다시 생성할 수 있습니다.
4. **[이 표지 사용]**을 누르면 Base64 응답을 Data URL로 변환해 `coverImageUrl`에 저장합니다. 상세 화면은 바로 PATCH하고, 등록 화면은 등록(POST)할 때 함께 저장합니다.

| 모델 | 고를 수 있는 크기 (모두 세로 2:3) |
| --- | --- |
| `gpt-image-2` (기본) | `768x1152`, `1024x1536`(기본), `1280x1920` |
| `gpt-image-2.5-flare` | `768x1152`, `1024x1536`(기본), `1280x1920` |
| `gpt-image-1-mini` | `1024x1536` (고정) |

목록·상세 표지가 모두 2:3 틀이라 크기는 세로 2:3만 제공해 표지가 잘리지 않습니다. 모델을 바꿀 때 지원하지 않는 크기는 `1024x1536`으로 바뀝니다.

브라우저가 OpenAI `POST /v1/images/generations`를 직접 호출합니다. API Key는 모달의 password 입력값으로만 보관하고 닫으면 사라지며 코드·`localStorage`·`db.json`에 저장하지 않습니다. 표지의 Data URL은 `db.json`에 저장됩니다. 생성 시 OpenAI 이용 요금이 발생할 수 있고, 401·429·네트워크 오류는 화면에 안내합니다.

## 관련 문서

- [기획서](./docs/planning.md)
- [디자인 시스템](./design-system/README.md)
