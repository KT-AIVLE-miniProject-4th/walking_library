import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg className="search-bar-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </svg>

      <input
        type="search"
        className="search-bar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onChange('')}
        placeholder="제목이나 저자로 검색하세요"
        aria-label="도서 검색"
      />

      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="7" y1="7" x2="17" y2="17" />
            <line x1="17" y1="7" x2="7" y2="17" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
