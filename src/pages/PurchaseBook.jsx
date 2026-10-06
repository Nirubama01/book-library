import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { useBooks } from "../context/BookContext";
import { useLibrary } from "../context/LibraryContext";

function PurchaseBook() {
  const { books } = useBooks();
  const { id } = useParams();
  const navigate = useNavigate();
  const { purchaseBook, placeOrder } = useLibrary();

const savedUser = JSON.parse(
  localStorage.getItem("bookStoreUser")
);

  const book = books.find((item) => item.id === id);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!book) {
    return (
      <div className="app-page">
        <main className="page-content">
          <h1>Book not found</h1>
        </main>
      </div>
    );
  }

  const updateCustomer = (field, value) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handlePlaceOrder = (event) => {
  event.preventDefault();

  purchaseBook(book.id);

  placeOrder({
    customer: customer.name,
    email: savedUser?.email || "customer@example.com",
    book: book.title,
    price: book.price,
    payment: paymentMethod,
    address: `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
  });

  setOrderPlaced(true);
};

  const isFormValid =
    customer.name.trim() &&
    customer.phone.trim() &&
    customer.address.trim() &&
    customer.city.trim() &&
    customer.state.trim() &&
    customer.pincode.trim();

  if (orderPlaced) {
    return (
      <div className="app-page">
        <main className="page-content order-confirmation-page">
          <div className="confirmation-icon">
            <CheckCircle2 size={46} />
          </div>

          <h1>Order Confirmed!</h1>

          <p className="confirmation-message">
            Thank you for your purchase. Your book will
            be shipped to your delivery address.
          </p>

          <section className="confirmation-book">
            <img
              src={book.cover}
              alt={book.title}
            />

            <div>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </section>

          <section className="confirmation-details">
            <div>
              <span>Delivery to</span>
              <strong>{customer.name}</strong>
              <p>
                {customer.address}, {customer.city},{" "}
                {customer.state} - {customer.pincode}
              </p>
            </div>

            <div>
              <span>Payment</span>
              <strong>{paymentMethod}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>
                ₹{book.price}
              </strong>
            </div>
          </section>

          <button
            className="primary-button"
            onClick={() => navigate("/my-books")}
          >
            View My Orders
          </button>

          <button
            className="confirmation-home-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app-page">
      <main className="page-content purchase-page">
        <div className="purchase-header">
          <button
            className="header-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>

          <h1>Buy Book</h1>
        </div>

        <section className="purchase-book-card">
          <img
            src={book.cover}
            alt={book.title}
          />

          <div>
            <h2>{book.title}</h2>

            <p>{book.author}</p>

            <strong>
              {book.price >= 100
                ? `₹${book.price}`
                : `$${book.price.toFixed(2)}`}
            </strong>
          </div>
        </section>

        <form onSubmit={handlePlaceOrder}>
          <section className="purchase-section">
            <div className="checkout-section-heading">
              <MapPin size={19} />
              <h2>Delivery Details</h2>
            </div>

            <div className="checkout-form">
              <label>
                Full Name

                <input
                  type="text"
                  value={customer.name}
                  onChange={(event) =>
                    updateCustomer(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Phone Number

                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(event) =>
                    updateCustomer(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="Enter your phone number"
                  required
                />
              </label>

              <label>
                Delivery Address

                <textarea
                  value={customer.address}
                  onChange={(event) =>
                    updateCustomer(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="House number, street, area"
                  rows="3"
                  required
                />
              </label>

              <div className="checkout-two-columns">
                <label>
                  City

                  <input
                    type="text"
                    value={customer.city}
                    onChange={(event) =>
                      updateCustomer(
                        "city",
                        event.target.value
                      )
                    }
                    placeholder="City"
                    required
                  />
                </label>

                <label>
                  State

                  <input
                    type="text"
                    value={customer.state}
                    onChange={(event) =>
                      updateCustomer(
                        "state",
                        event.target.value
                      )
                    }
                    placeholder="State"
                    required
                  />
                </label>
              </div>

              <label>
                PIN Code

                <input
                  type="text"
                  inputMode="numeric"
                  value={customer.pincode}
                  onChange={(event) =>
                    updateCustomer(
                      "pincode",
                      event.target.value
                    )
                  }
                  placeholder="6-digit PIN code"
                  maxLength="6"
                  required
                />
              </label>
            </div>
          </section>

          <section className="purchase-section">
            <div className="checkout-section-heading">
              <CreditCard size={19} />
              <h2>Payment Method</h2>
            </div>

            <div className="checkout-payment-options">
              <label className="checkout-payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    paymentMethod === "Cash on Delivery"
                  }
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <div>
                  <strong>Cash on Delivery</strong>
                  <span>
                    Pay when your book is delivered
                  </span>
                </div>
              </label>

              <label className="checkout-payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Online Payment"
                  checked={
                    paymentMethod === "Online Payment"
                  }
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <div>
                  <strong>Online Payment</strong>
                  <span>
                    UPI, Cards and Netbanking
                  </span>
                </div>
              </label>
            </div>
          </section>

          <section className="purchase-section">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Book Price</span>

              <strong>
                {book.price >= 100
                  ? `₹${book.price}`
                  : `$${book.price.toFixed(2)}`}
              </strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <strong className="free-text">
                Free
              </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total</span>

              <strong>
                {book.price >= 100
                  ? `₹${book.price}`
                  : `$${book.price.toFixed(2)}`}
              </strong>
            </div>
          </section>

          <button
            type="submit"
            className="primary-button payment-button"
            disabled={!isFormValid}
          >
            Place Order
          </button>
        </form>
      </main>
    </div>
  );
}

export default PurchaseBook;