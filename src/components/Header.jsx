import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ title, showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      {showBack && (
        <button
          className="header-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>
      )}

      <h1>{title}</h1>
    </header>
  );
}

export default Header;