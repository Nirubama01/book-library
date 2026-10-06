/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
} from "react";

import { books as initialBooks } from "../data/books";

const BookContext = createContext();

function BookProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const savedBooks =
      localStorage.getItem("bookStoreBooks");

    return savedBooks
      ? JSON.parse(savedBooks)
      : initialBooks;
  });

  const addBook = (newBook) => {
    setBooks((previous) => {
      const updatedBooks = [
        ...previous,
        newBook,
      ];

      localStorage.setItem(
        "bookStoreBooks",
        JSON.stringify(updatedBooks)
      );

      return updatedBooks;
    });
  };

  const updateBook = (bookId, updatedBook) => {
    setBooks((previous) => {
      const updatedBooks = previous.map(
        (book) =>
          book.id === bookId
            ? {
                ...book,
                ...updatedBook,
              }
            : book
      );

      localStorage.setItem(
        "bookStoreBooks",
        JSON.stringify(updatedBooks)
      );

      return updatedBooks;
    });
  };

  const deleteBook = (bookId) => {
    setBooks((previous) => {
      const updatedBooks = previous.filter(
        (book) => book.id !== bookId
      );

      localStorage.setItem(
        "bookStoreBooks",
        JSON.stringify(updatedBooks)
      );

      return updatedBooks;
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

function useBooks() {
  return useContext(BookContext);
}

export {
  BookProvider,
  useBooks,
};