import {
  User,
  Mail,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { useLibrary } from "../context/LibraryContext";

function Profile() {
  const navigate = useNavigate();

  const {
    purchasedBooks,
    wishlist,
    orders,
  } = useLibrary();

  const savedUser = JSON.parse(
    localStorage.getItem("bookStoreUser")
  );

  const customerOrders = orders.filter(
    (order) =>
      order.email === savedUser?.email
  );

  return (
    <div className="app-page">
      <main className="page-content profile-page">

        <Header title="Profile" />

        <section className="profile-card">

          <div className="profile-avatar">
            <User size={30} />
          </div>

          <div className="profile-info">

            <h2>
              {savedUser?.name || "Customer"}
            </h2>

            <div className="profile-email">
              <Mail size={14} />

              <span>
                {savedUser?.email ||
                  "No email available"}
              </span>
            </div>

          </div>

        </section>

        <section className="profile-stats">

          <div className="profile-stat">
            <ShoppingBag size={19} />

            <strong>
              {purchasedBooks.length}
            </strong>

            <span>Purchased</span>
          </div>

          <div className="profile-stat">
            <Heart size={19} />

            <strong>
              {wishlist.length}
            </strong>

            <span>Wishlist</span>
          </div>

          <div className="profile-stat">
            <ShoppingBag size={19} />

            <strong>
              {customerOrders.length}
            </strong>

            <span>Orders</span>
          </div>

        </section>

        <section className="profile-menu">

          <button
            className="profile-menu-item"
            onClick={() =>
              navigate("/my-books")
            }
          >
            <div className="profile-menu-icon">
              <ShoppingBag size={19} />
            </div>

            <div className="profile-menu-text">
              <strong>My Orders</strong>

              <span>
                Track your book orders
              </span>
            </div>

            <ChevronRight size={18} />
          </button>

          <button
            className="profile-menu-item"
            onClick={() =>
              navigate("/wishlist")
            }
          >
            <div className="profile-menu-icon">
              <Heart size={19} />
            </div>

            <div className="profile-menu-text">
              <strong>Wishlist</strong>

              <span>
                Books you want to buy later
              </span>
            </div>

            <ChevronRight size={18} />
          </button>

          <button
            className="profile-menu-item"
            onClick={() =>
              navigate("/")
            }
          >
            <div className="profile-menu-icon">
              <ShoppingBag size={19} />
            </div>

            <div className="profile-menu-text">
              <strong>Browse Books</strong>

              <span>
                Discover more books
              </span>
            </div>

            <ChevronRight size={18} />
          </button>

        </section>

        <button
          className="profile-logout"
          onClick={() => {
            localStorage.removeItem(
              "isLoggedIn"
            );

            navigate("/login");
          }}
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

      </main>

      <BottomNavigation />
    </div>
  );
}

export default Profile;