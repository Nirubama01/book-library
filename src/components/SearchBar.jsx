import { Search } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search books" }) {
  return (
    <div className="search-bar">
      <Search size={20} className="search-icon" />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;