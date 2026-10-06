import {
  BookOpen,
  ShoppingBag,
  Users,
  IndianRupee,
  Package,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../../context/BookContext";
import { useLibrary } from "../../context/LibraryContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { books } = useBooks();
  const { orders } = useLibrary();

const customerEmails = [
  ...new Set(
    orders
      .map((order) => order.email)
      .filter(
        (email) =>
          email &&
          email !== "customer@example.com"
      )
  ),
];
  const handleLogout = () => {
  localStorage.removeItem("isAdminLoggedIn");
  navigate("/admin/login", {
    replace: true,
  });
};

  return (
    <div className="admin-page">

      <header className="admin-header">
        <div>
          <p className="admin-label">BOOK STORE</p>
          <h1>Admin Dashboard</h1>
        </div>

        <button
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          Logout
        </button>
      </header>

      <main className="admin-content">

        <section className="admin-welcome">
          <div>
            <h2>Welcome, Admin</h2>
            <p>
              Manage your bookstore, orders and customers.
            </p>
          </div>

          <Package size={38} />
        </section>

        <section className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <BookOpen size={21} />
            </div>

            <span>Total Books</span>
            <strong>{books.length}</strong>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <ShoppingBag size={21} />
            </div>

            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Users size={21} />
            </div>

            <span>Customers</span>
            <strong>{customerEmails.length}</strong>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <IndianRupee size={21} />
            </div>

            <span>Revenue</span>
            <strong>
  ₹
  {orders.reduce(
    (total, order) => total + Number(order.price),
    0
  )}
</strong>
          </div>

        </section>

        <section className="admin-section">

          <div className="admin-section-heading">
            <div>
              <ShoppingBag size={18} />
              <h2>Recent Orders</h2>
            </div>

            <button
              onClick={() => navigate("/admin/orders")}
            >
              View All
            </button>
          </div>

          <div className="admin-order-card">

            <div className="admin-order-book">
              <div className="admin-order-icon">
                <BookOpen size={19} />
              </div>

              <div>
                <strong>
  {orders.length > 0
    ? orders[orders.length - 1].book
    : "No orders yet"}
</strong>

<span>
  {orders.length > 0
    ? orders[orders.length - 1].customer
    : ""}
</span>
              </div>
            </div>

            <div className="admin-order-details">
              <strong>
  {orders.length > 0
    ? `₹${orders[orders.length - 1].price}`
    : "₹0"}
</strong>

<span className="admin-order-status">
  {orders.length > 0
    ? orders[orders.length - 1].status
    : "No orders"}
</span>
            </div>

          </div>

        </section>

        <section className="admin-section">

          <div className="admin-section-heading">
            <div>
              <BookOpen size={18} />
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="admin-quick-actions">

            <button
              onClick={() => navigate("/admin/books")}
            >
              <BookOpen size={20} />
              <span>Manage Books</span>
            </button>

            <button
              onClick={() => navigate("/admin/orders")}
            >
              <ShoppingBag size={20} />
              <span>Manage Orders</span>
            </button>

            <button
              onClick={() => navigate("/admin/customers")}
            >
              <Users size={20} />
              <span>Customers</span>
            </button>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;