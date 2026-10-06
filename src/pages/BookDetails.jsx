import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useBooks } from "../context/BookContext";
import { useLibrary } from "../context/LibraryContext";

function BookDetails() {
  const { books } = useBooks();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useLibrary();

  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <div className="app-page">
        <main className="page-content">
          <button
            className="header-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={22} />
          </button>

          <h2>Book not found</h2>
        </main>
      </div>
    );
  }

  const wishlist = isInWishlist(book.id);

  const toggleWishlist = () => {
    if (wishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
  };

  return (
    <div className="app-page">
      <main className="page-content book-details-page">
        <div className="details-topbar">
          <button
            className="header-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>

          <button
            className={`details-wishlist ${
              wishlist ? "liked" : ""
            }`}
            onClick={toggleWishlist}
            aria-label="Wishlist"
          >
            <Heart
              size={21}
              fill={wishlist ? "currentColor" : "none"}
            />
          </button>
        </div>

        <section className="details-cover-wrapper">
          <img
            className="details-cover"
            src={book.cover}
            alt={book.title}
          />
        </section>

        <section className="details-information">
          <h1>{book.title}</h1>

          <p className="details-author">
            by {book.author}
          </p>

          <div className="details-availability">
            {book.availableCopies > 0
              ? `${book.availableCopies} copies available`
              : "Currently unavailable"}
          </div>

          <div className="details-info-grid">
            <div>
              <span>Genre</span>
              <strong>{book.genre}</strong>
            </div>

            <div>
              <span>Pages</span>
              <strong>{book.pages}</strong>
            </div>

            <div>
              <span>Publisher</span>
              <strong>{book.publisher}</strong>
            </div>

            <div>
              <span>Language</span>
              <strong>{book.language}</strong>
            </div>
          </div>

          <div className="details-about">
            <h2>About the Book</h2>

            <p>{book.description}</p>
          </div>

          <div className="details-price">
            <span>Purchase Price</span>

            <strong>
              ₹{book.price}
            </strong>
          </div>

          <div className="details-actions">
            <button
              className="details-buy-button"
              onClick={() =>
                navigate(`/purchase/${book.id}`)
              }
            >
              Buy Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BookDetails;