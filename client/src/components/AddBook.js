import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const [state, setstate] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const [addBookMut] = useMutation(addBookMutation);

  const DisplayAuthors = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBookMut({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }], //refetch the data using
      // so that getBookQuery when we add data to db we can see immediate
      // update on the front end
    });
    console.log(state);
  };

  //   console.log(state);

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => {
            setstate((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => {
            setstate((prevState) => ({
              ...prevState,
              genre: e.target.value,
            }));
          }}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => {
            setstate((prevState) => ({
              ...prevState,
              authorId: e.target.value,
            }));
          }}
        >
          <option>Select author</option>
          {DisplayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
