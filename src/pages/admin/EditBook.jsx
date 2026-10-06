import {
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import { useBooks } from "../../context/BookContext";

function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { books, updateBook: saveBook } = useBooks();

  const existingBook = books.find(
    (book) => book.id === id
  );

  const [book, setBook] = useState(
    existingBook
      ? {
          title: existingBook.title,
          author: existingBook.author,
          genre: existingBook.genre,
          price: existingBook.price,
          copies: existingBook.availableCopies,
          pages: existingBook.pages,
          publisher: existingBook.publisher,
          language: existingBook.language,
          description: existingBook.description,
        }
      : null
  );

  if (!existingBook || !book) {
    return (
      <div className="admin-page">
        <main className="admin-content">
          <h1>Book not found</h1>

          <button
            className="admin-cancel-button"
            onClick={() =>
              navigate("/admin/books")
            }
          >
            Back to Books
          </button>
        </main>
      </div>
    );
  }

  const updateBook = (field, value) => {
    setBook((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  saveBook(id, {
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: Number(book.price),
    availableCopies: Number(book.copies),
    pages: Number(book.pages),
    publisher: book.publisher,
    language: book.language,
    description: book.description,
    type:
      Number(book.copies) > 0
        ? "available"
        : "wishlist",
  });

  alert("Book updated successfully!");

  navigate("/admin/books");
};

  return (
    <div className="admin-page">

      <header className="admin-header">

        <div className="admin-header-left">

          <button
            className="admin-back-button"
            onClick={() =>
              navigate("/admin/books")
            }
            aria-label="Back to books"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="admin-label">
              BOOK STORE
            </p>

            <h1>Edit Book</h1>
          </div>

        </div>

      </header>

      <main className="admin-content">

        <section className="admin-form-card">

          <div className="admin-form-title">
            <BookOpen size={20} />

            <div>
              <h2>Book Information</h2>

              <p>
                Update the details of this book.
              </p>
            </div>
          </div>

          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >

            <label>
              Book Title

              <input
                type="text"
                value={book.title}
                onChange={(event) =>
                  updateBook(
                    "title",
                    event.target.value
                  )
                }
                required
              />
            </label>

            <label>
              Author

              <input
                type="text"
                value={book.author}
                onChange={(event) =>
                  updateBook(
                    "author",
                    event.target.value
                  )
                }
                required
              />
            </label>

            <div className="admin-form-two-columns">

              <label>
                Genre

                <input
                  type="text"
                  value={book.genre}
                  onChange={(event) =>
                    updateBook(
                      "genre",
                      event.target.value
                    )
                  }
                  required
                />
              </label>

              <label>
                Price

                <input
                  type="number"
                  value={book.price}
                  onChange={(event) =>
                    updateBook(
                      "price",
                      event.target.value
                    )
                  }
                  min="0"
                  required
                />
              </label>

            </div>

            <div className="admin-form-two-columns">

              <label>
                Available Copies

                <input
                  type="number"
                  value={book.copies}
                  onChange={(event) =>
                    updateBook(
                      "copies",
                      event.target.value
                    )
                  }
                  min="0"
                  required
                />
              </label>

              <label>
                Pages

                <input
                  type="number"
                  value={book.pages}
                  onChange={(event) =>
                    updateBook(
                      "pages",
                      event.target.value
                    )
                  }
                  min="1"
                  required
                />
              </label>

            </div>

            <label>
              Publisher

              <input
                type="text"
                value={book.publisher}
                onChange={(event) =>
                  updateBook(
                    "publisher",
                    event.target.value
                  )
                }
                required
              />
            </label>

            <label>
              Language

              <select
                value={book.language}
                onChange={(event) =>
                  updateBook(
                    "language",
                    event.target.value
                  )
                }
              >
                <option value="English">
                  English
                </option>

                <option value="Tamil">
                  Tamil
                </option>

                <option value="Hindi">
                  Hindi
                </option>

                <option value="Malayalam">
                  Malayalam
                </option>
              </select>
            </label>

            <label>
              Description

              <textarea
                rows="5"
                value={book.description}
                onChange={(event) =>
                  updateBook(
                    "description",
                    event.target.value
                  )
                }
                required
              />
            </label>

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-cancel-button"
                onClick={() =>
                  navigate("/admin/books")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-save-button"
              >
                Save Changes
              </button>

            </div>

          </form>

        </section>

      </main>
    </div>
  );
}

export default EditBook;