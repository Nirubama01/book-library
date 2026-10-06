import {
  ArrowLeft,
  Users,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useMemo } from "react";

function ManageCustomers() {
  const navigate = useNavigate();
  const { orders } = useLibrary();

  const customers = useMemo(() => {
  const savedUser = JSON.parse(
    localStorage.getItem("bookStoreUser")
  );

  if (!savedUser) {
    return [];
  }

  const customerOrders = orders.filter(
    (order) => order.email === savedUser.email
  );

  const totalSpent = customerOrders.reduce(
    (total, order) =>
      total + Number(order.price),
    0
  );

  return [
    {
      id: savedUser.email,
      name: savedUser.name,
      email: savedUser.email,
      orders: customerOrders.length,
      spent: totalSpent,
    },
  ];
}, [orders]);

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

            <h1>Customers</h1>
          </div>

        </div>

      </header>

      <main className="admin-content">

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>
              <Users size={18} />
              <h2>All Customers</h2>
            </div>

            <span className="admin-count">
              {customers.length}
            </span>

          </div>

          <div className="admin-customers-list">

            {customers.length > 0 ? (
              customers.map((customer) => (
                <article
                  className="admin-customer-card"
                  key={customer.id}
                >

                  <div className="admin-customer-avatar">
                    <Users size={21} />
                  </div>

                  <div className="admin-customer-main">

                    <h3>{customer.name}</h3>

                    <div className="admin-customer-email">
                      <Mail size={13} />
                      <span>
                        {customer.email}
                      </span>
                    </div>

                    <div className="admin-customer-stats">

                      <div>
                        <ShoppingBag size={14} />

                        <span>
                          {customer.orders} Orders
                        </span>
                      </div>

                      <div>
                        <strong>
                          ₹{customer.spent}
                        </strong>

                        <span>
                          Total Spent
                        </span>
                      </div>

                    </div>

                  </div>

                </article>
              ))
            ) : (
              <div className="empty-state">
                <p>No registered customers found.</p>
              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default ManageCustomers;