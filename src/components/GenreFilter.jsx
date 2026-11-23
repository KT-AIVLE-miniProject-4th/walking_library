import { GENRES } from '../constants/genres.js';
import './GenreFilter.css';

const OPTIONS = [{ label: '전체', value: '' }, ...GENRES.map((genre) => ({ label: genre, value: genre }))];

function GenreFilter({ value, onChange }) {
  return (
    <div className="genre-filter" role="group" aria-label="장르 필터">
      {OPTIONS.map((option) => (
        <button
          key={option.label}
          type="button"
          className={`genre-filter-chip${value === option.value ? ' is-active' : ''}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
