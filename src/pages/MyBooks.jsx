import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import { useLibrary } from "../context/LibraryContext";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

function MyBooks() {
  const { books } = useBooks();
  const { orders } = useLibrary();
  const navigate = useNavigate();

  const savedUser = JSON.parse(
    localStorage.getItem("bookStoreUser")
  );

  const customerOrders = orders.filter(
    (order) =>
      order.email === savedUser?.email
  );

  return (
    <div className="app-page">
      <main className="page-content my-books-page">

        <Header title="Orders" />

        <section className="my-books-section">

          <div className="my-books-section-heading">

            <div>
              <Package size={18} />
              <h2>Your Orders</h2>
            </div>

            <span>
              {customerOrders.length}
            </span>

          </div>

          {customerOrders.length === 0 ? (
            <div className="my-books-empty">

              <p>
                You haven't placed any orders yet.
              </p>

              <button
                className="my-books-browse-button"
                onClick={() => navigate("/")}
              >
                Browse Books
              </button>

            </div>
          ) : (
            <div className="my-books-list">

              {customerOrders.map((order) => {

                const book = books.find(
                  (item) =>
                    item.title === order.book
                );

                return (
                  <article
                    className="my-book-card"
                    key={order.id}
                  >

                    {book && (
                      <img
                        src={book.cover}
                        alt={book.title}
                        onClick={() =>
                          navigate(
                            `/books/${book.id}`
                          )
                        }
                      />
                    )}

                    <div className="my-book-card-content">

                      <h3>{order.book}</h3>

                      {book && (
                        <p>{book.author}</p>
                      )}

                      <div className="my-book-date">
                        <span>Order ID</span>
                        <strong>
                          {order.id}
                        </strong>
                      </div>

                      <div className="my-book-date">
                        <span>Order Date</span>
                        <strong>
                          {order.date}
                        </strong>
                      </div>

                      <div className="my-book-date">
                        <span>Total</span>
                        <strong>
                          ₹{order.price}
                        </strong>
                      </div>

                      <div className="order-status">
                        <span className="order-status-dot"></span>
                        {order.status}
                      </div>

                      {book && (
                        <button
                          className="my-book-open-button"
                          onClick={() =>
                            navigate(
                              `/books/${book.id}`
                            )
                          }
                        >
                          View Book
                        </button>
                      )}

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </main>

      <BottomNavigation />

    </div>
  );
}

export default MyBooks;