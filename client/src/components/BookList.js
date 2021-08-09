import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

// component
import BookDetails from "./BookDetails";

function BookList(props) {
  const [state, setstate] = useState({ selected: null });
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) {
    return <p>Loading books...</p>;
  }
  if (error) {
    return <p>Error </p>;
  }

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li
            key={book.id}
            onClick={(e) => {
              setstate({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={state.selected} />
    </div>
  );
}

export default BookList;
