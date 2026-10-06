import { useMemo, useState } from "react";
import { useBooks } from "../context/BookContext";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import BottomNavigation from "../components/BottomNavigation";

function BrowseBooks() {
  const { books } = useBooks();
  const [search, setSearch] = useState("");

  const availableBooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

      return book.type === "available" && matchesSearch;
    });
  }, [books, search]);

  return (
    <div className="app-page">
      <main className="page-content">
        <Header title="Book Store" />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search books"
        />

        <section className="books-section">
          <div className="section-heading">
            <h2>Books for Sale</h2>
          </div>

          <div className="books-list">
            {availableBooks.length > 0 ? (
              availableBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No books found.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default BrowseBooks;