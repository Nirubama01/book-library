/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  purchasedBooks as initialPurchasedBooks,
} from "../data/books";

const LibraryContext = createContext();

function LibraryProvider({ children }) {
  const [purchasedBooks, setPurchasedBooks] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "bookStorePurchasedBooks"
        );

      return saved
        ? JSON.parse(saved)
        : initialPurchasedBooks;
    });

  const [orders, setOrders] = useState(() => {
    const saved =
      localStorage.getItem("bookStoreOrders");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: "ORD-1001",
        customer: "Alex Johnson",
        email: "alex.johnson@example.com",
        book: "Atomic Habits",
        price: 599,
        payment: "Cash on Delivery",
        status: "Preparing for Shipment",
        address:
          "12 Main Street, Tirunelveli, Tamil Nadu - 627001",
        date: "19 July 2026",
      },
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved =
      localStorage.getItem("bookStoreWishlist");

    return saved
      ? JSON.parse(saved)
      : [
          "forty-rules-of-love",
          "rich-dad-poor-dad",
          "it-ends-with-us",
          "sapiens",
        ];
  });

  const purchaseBook = (bookId) => {
    const alreadyPurchased =
      purchasedBooks.some(
        (book) => book.id === bookId
      );

    if (alreadyPurchased) return;

    setPurchasedBooks((previous) => {
      const updatedBooks = [
        ...previous,
        {
          id: bookId,
          purchasedOn:
            new Date().toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
        },
      ];

      localStorage.setItem(
        "bookStorePurchasedBooks",
        JSON.stringify(updatedBooks)
      );

      return updatedBooks;
    });
  };

  const placeOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: "Placed",
      date:
        new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
    };

    setOrders((previous) => {
      const updatedOrders = [
        ...previous,
        newOrder,
      ];

      localStorage.setItem(
        "bookStoreOrders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  const updateOrderStatus = (
    orderId,
    status
  ) => {
    setOrders((previous) => {
      const updatedOrders = previous.map(
        (order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
      );

      localStorage.setItem(
        "bookStoreOrders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  const addToWishlist = (bookId) => {
    setWishlist((previous) => {
      if (previous.includes(bookId)) {
        return previous;
      }

      const updatedWishlist = [
        ...previous,
        bookId,
      ];

      localStorage.setItem(
        "bookStoreWishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((previous) => {
      const updatedWishlist =
        previous.filter(
          (id) => id !== bookId
        );

      localStorage.setItem(
        "bookStoreWishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    });
  };

  const isPurchased = (bookId) => {
    return purchasedBooks.some(
      (book) => book.id === bookId
    );
  };

  const isInWishlist = (bookId) => {
    return wishlist.includes(bookId);
  };

  return (
    <LibraryContext.Provider
      value={{
        purchasedBooks,
        wishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        purchaseBook,
        addToWishlist,
        removeFromWishlist,
        isPurchased,
        isInWishlist,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

function useLibrary() {
  return useContext(LibraryContext);
}

export {
  LibraryProvider,
  useLibrary,
};