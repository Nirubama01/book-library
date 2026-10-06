import { Navigate } from "react-router-dom";

function ProtectedUserRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedUserRoute;