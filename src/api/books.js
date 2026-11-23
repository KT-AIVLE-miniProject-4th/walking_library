import { API_URL } from './config.js';

// 공통 요청: 응답이 ok가 아니면 에러를 던진다
async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
  return res.json();
}

// 본문이 있는 요청 (POST, PATCH, DELETE)
async function requestWithBody(path, method, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
  return res.json();
}

// GET /books — 전체 목록 조회
export const getBooks = () => request('/books');

// GET /books/:id — 단건 조회
export const getBook = (id) => request(`/books/${id}`);

// POST /books — 신규 도서 등록
export const createBook = (book) => requestWithBody('/books', 'POST', book);

// PATCH /books/:id — 변경된 필드만 부분 업데이트
export const updateBook = (id, patch) => requestWithBody(`/books/${id}`, 'PATCH', patch);

// DELETE /books/:id — headers·body 없음, 상태 코드만 확인
export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
};
