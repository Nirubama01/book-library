import {
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBooks } from "../../context/BookContext";

function AddBook() {
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    copies: "",
    pages: "",
    publisher: "",
    language: "English",
    description: "",
  });

  const updateBook = (field, value) => {
    setBook((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  const newBook = {
    id: book.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-"),
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: Number(book.price),
    availableCopies: Number(book.copies),
    pages: Number(book.pages),
    publisher: book.publisher,
    language: book.language,
    description: book.description,
    cover: "/books/harry-potter.jpg",
    type:
      Number(book.copies) > 0
        ? "available"
        : "wishlist",
  };

  addBook(newBook);

  alert("Book added successfully!");

  navigate("/admin/books");
};

  return (
    <div className="admin-page">

      <header className="admin-header">

        <div className="admin-header-left">

          <button
            className="admin-back-button"
            onClick={() => navigate("/admin/books")}
            aria-label="Back to books"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="admin-label">
              BOOK STORE
            </p>

            <h1>Add Book</h1>
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
                Enter the details of the new book.
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
                placeholder="Enter book title"
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
                placeholder="Enter author name"
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
                  placeholder="e.g. Fiction"
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
                  placeholder="₹0"
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
                  placeholder="0"
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
                  placeholder="Number of pages"
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
                placeholder="Enter publisher"
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
                placeholder="Enter book description"
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
                Add Book
              </button>

            </div>

          </form>

        </section>

      </main>
    </div>
  );
}

export default AddBook;