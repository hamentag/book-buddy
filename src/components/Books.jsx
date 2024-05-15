import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllbooks } from "../api";

export default function Books(){
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getBooks() {
          try{
            const APIResponse = await fetchAllbooks();
            setBooks(APIResponse.books);
          } catch(err){
            setError(APIResponse.error.message);
          }
        }
        getBooks();
      }, []);

      const booksToDisplay = searchParam
      ? books.filter((book) =>
          book.title.toLowerCase().includes(searchParam)
        )
      : books;
  
      const numBooks = booksToDisplay.length;
  
    return(
        <div>
            <div>
                <label>
                    Search:{" "}
                    <input
                        type="text"
                        placeholder="search"
                        onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
                    />
                </label>
                {searchParam &&
                    <p>
                        {numBooks === 0 ? <span>No results match</span>
                            : numBooks === 1 ? <span><b>{numBooks}</b> result matches </span>
                                : <span><b>{numBooks}</b> results match </span>} your search criteria
                    </p>
                }
                {!searchParam &&
                    <h3>
                        Total number of books: {numBooks}
                    </h3>
                }
            </div>
            {error && <p>{error}</p>}
            <ol className="display-books">
                {booksToDisplay.map((book) => {
                    return(
                        <li key={book.id}>
                            <h4>{book.title}</h4>
                            <button
                                onClick={() => {
                                navigate(`/${book.id}`);
                                }}
                            >
                                See-Details
                            </button>
                        </li>)
                })}
            </ol>
        </div>
    )
}