import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

function BookCard({ book }) {
  const navigate = useNavigate();

  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useLibrary();

  const wishlist = isInWishlist(book.id);

  const handleWishlist = (event) => {
    event.stopPropagation();

    if (wishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
  };

  return (
    <article
      className="book-card"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <div className="book-card-cover">
        <img
          src={book.cover}
          alt={book.title}
        />

        <button
          className={`wishlist-button ${wishlist ? "liked" : ""}`}
          onClick={handleWishlist}
          aria-label="Wishlist"
        >
          <Heart
            size={19}
            fill={wishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="book-card-content">
        <h3>{book.title}</h3>

        <p className="book-author">
          {book.author}
        </p>

        <p className="book-availability">
  {book.availableCopies > 0
    ? `${book.availableCopies} copies available`
    : "Currently unavailable"}
</p>

<p className="book-card-price">
  ₹{book.price}
</p>

        <div className="book-card-actions">
          <button
            className="card-buy-button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/purchase/${book.id}`);
            }}
          >
            <ShoppingBag size={15} />
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;