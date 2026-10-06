import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetails from "./pages/BookDetails";
import PurchaseBook from "./pages/PurchaseBook";
import Wishlist from "./pages/Wishlist";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import ManageBooks from "./pages/admin/ManageBooks";
import AddBook from "./pages/admin/AddBook";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageCustomers from "./pages/admin/ManageCustomers";
import EditBook from "./pages/admin/EditBook";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/books"
  element={
    <ProtectedAdminRoute>
      <ManageBooks />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/books/add"
  element={
    <ProtectedAdminRoute>
      <AddBook />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedAdminRoute>
      <ManageOrders />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/customers"
  element={
    <ProtectedAdminRoute>
      <ManageCustomers />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/books/edit/:id"
  element={
    <ProtectedAdminRoute>
      <EditBook />
    </ProtectedAdminRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/"
  element={
    <ProtectedUserRoute>
      <BrowseBooks />
    </ProtectedUserRoute>
  }
/>

<Route
  path="/books/:id"
  element={
    <ProtectedUserRoute>
      <BookDetails />
    </ProtectedUserRoute>
  }
/>

<Route
  path="/purchase/:id"
  element={
    <ProtectedUserRoute>
      <PurchaseBook />
    </ProtectedUserRoute>
  }
/>

<Route
  path="/wishlist"
  element={
    <ProtectedUserRoute>
      <Wishlist />
    </ProtectedUserRoute>
  }
/>

<Route
  path="/my-books"
  element={
    <ProtectedUserRoute>
      <MyBooks />
    </ProtectedUserRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedUserRoute>
      <Profile />
    </ProtectedUserRoute>
  }
/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;