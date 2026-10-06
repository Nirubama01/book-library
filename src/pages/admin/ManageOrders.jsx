import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";

function ManageOrders() {
  const {
  orders,
  updateOrderStatus,
} = useLibrary();
  const navigate = useNavigate();

 
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
            <p className="admin-label">
              BOOK STORE
            </p>

            <h1>Manage Orders</h1>
          </div>

        </div>

      </header>

      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>
              <ShoppingBag size={18} />
              <h2>All Orders</h2>
            </div>

            <span className="admin-count">
              {orders.length}
            </span>

          </div>

          <div className="admin-orders-list">

            {orders.map((order) => (
              <article
                className="admin-full-order-card"
                key={order.id}
              >

                <div className="admin-order-top">

                  <div>
                    <span className="admin-order-id">
                      {order.id}
                    </span>

                    <strong>
                      {order.book}
                    </strong>
                  </div>

                  <span className="admin-order-price">
                    ₹{order.price}
                  </span>

                </div>

                <div className="admin-customer-info">

                  <div>
                    <strong>
                      {order.customer}
                    </strong>

                    <span>
                      {order.email}
                    </span>
                  </div>

                </div>

                <div className="admin-order-info-row">

                  <MapPin size={16} />

                  <span>
                    {order.address}
                  </span>

                </div>

                <div className="admin-order-info-row">

                  <CreditCard size={16} />

                  <span>
                    {order.payment}
                  </span>

                </div>

                <div className="admin-order-bottom">

                  <div>
                    <span>Order Date</span>
                    <strong>{order.date}</strong>
                  </div>

                  <div>
                    <span>Status</span>

                    <select
  value={order.status}
  onChange={(event) =>
    updateOrderStatus(
      order.id,
      event.target.value
    )
  }
  className="admin-order-status-select"
>
                      <option>
                        Placed
                      </option>

                      <option>
                        Preparing for Shipment
                      </option>

                      <option>
                        Shipped
                      </option>

                      <option>
                        Out for Delivery
                      </option>

                      <option>
                        Delivered
                      </option>
                    </select>
                  </div>

                </div>

              </article>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default ManageOrders;