import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../../context/BookContext";

function ManageBooks() {
  const navigate = useNavigate();

  const {
    books,
    deleteBook,
  } = useBooks();

  return (
    <div className="admin-page">

      <header className="admin-header">

        <div className="admin-header-left">
          <button
            className="admin-back-button"
            onClick={() => navigate("/admin")}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="admin-label">BOOK STORE</p>
            <h1>Manage Books</h1>
          </div>
        </div>

        <button
          className="admin-add-button"
          onClick={() => navigate("/admin/books/add")}
        >
          <Plus size={17} />
          Add Book
        </button>

      </header>

      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-heading">
            <div>
              <BookOpen size={18} />
              <h2>All Books</h2>
            </div>

            <span className="admin-count">
              {books.length}
            </span>
          </div>

          <div className="admin-books-list">

            {books.map((book) => (
              <article
                className="admin-book-card"
                key={book.id}
              >

                <img
                  src={book.cover}
                  alt={book.title}
                />

                <div className="admin-book-info">

                  <h3>{book.title}</h3>

                  <p>{book.author}</p>

                  <div className="admin-book-meta">
                    <span>
                      ₹{book.price}
                    </span>

                    <span>
                      {book.availableCopies} in stock
                    </span>
                  </div>

                </div>

                <div className="admin-book-actions">

                  <button
                    className="admin-edit-button"
                    onClick={() =>
                      navigate(
                        `/admin/books/edit/${book.id}`
                      )
                    }
                    aria-label="Edit book"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="admin-delete-button"
                    onClick={() => {
  const confirmed = window.confirm(
    `Delete "${book.title}"?`
  );

  if (confirmed) {
    deleteBook(book.id);
  }
}}
                    aria-label="Delete book"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </article>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default ManageBooks;