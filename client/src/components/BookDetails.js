import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookId }, // use the bookId passed
    // by prop to query a single book
  });

  let display;
  if (loading) {
    display = <div>Loading...</div>;
  } else if (error) {
    display = <p>Error :(</p>;
  } else {
    const { book } = data;
    if (book) {
      display = (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      display = <div>No book selected...</div>;
    }
  }

  return <div id="book-details">{display}</div>;
}

export default BookDetails;
