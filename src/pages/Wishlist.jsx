import { Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import { useLibrary } from "../context/LibraryContext";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

function Wishlist() {
  const { books } = useBooks();
  const navigate = useNavigate();

  const {
    wishlist,
    removeFromWishlist,
  } = useLibrary();

  const wishlistBooks = books.filter((book) =>
    wishlist.includes(book.id)
  );

  return (
    <div className="app-page">
      <main className="page-content wishlist-page">
        <Header title="Wishlist" />

        {wishlistBooks.length === 0 ? (
          <div className="empty-state wishlist-empty">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="wishlist-list">
            {wishlistBooks.map((book) => (
              <article
                className="wishlist-card"
                key={book.id}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  onClick={() =>
                    navigate(`/books/${book.id}`)
                  }
                />

                <div className="wishlist-card-content">
                  <h2>{book.title}</h2>

                  <p>{book.author}</p>

                  <strong>
                    ₹{book.price}
                  </strong>

                  <button
                    className="wishlist-buy-button"
                    onClick={() =>
                      navigate(`/purchase/${book.id}`)
                    }
                  >
                    <ShoppingBag size={15} />
                    Buy Now
                  </button>
                </div>

                <button
                  className="wishlist-delete"
                  onClick={() =>
                    removeFromWishlist(book.id)
                  }
                  aria-label={`Remove ${book.title} from wishlist`}
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}

export default Wishlist;