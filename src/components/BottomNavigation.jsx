import { Home, ShoppingBag, Heart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

function BottomNavigation() {
  return (
    <nav className="bottom-navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <Home size={22} strokeWidth={2} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/my-books"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <ShoppingBag size={22} strokeWidth={2} />
        <span>Orders</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <Heart size={22} strokeWidth={2} />
        <span>Wishlist</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <User size={22} strokeWidth={2} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;