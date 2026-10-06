import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LibraryProvider } from "./context/LibraryContext";
import { BookProvider } from "./context/BookContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LibraryProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </LibraryProvider>
  </React.StrictMode>
);