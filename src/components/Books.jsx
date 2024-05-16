import { useState, useEffect } from "react";
import { fetchAllbooks } from "../api";
import BookCard from "./BookCard"

export default function Books({token}){
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");

    useEffect(() => {
        async function getBooks() {
          try{
            const APIResponse = await fetchAllbooks();
            setBooks(APIResponse.books);
          } catch(err){
            console.error(err)
            setError("Oops Something went wrong!");
          }
        }
        getBooks();
      }, []);

      const booksToDisplay = searchParam ? 
        books.filter((book) =>
          book.title.toLowerCase().includes(searchParam)
        )
        : books;
  
      const numBooks = booksToDisplay.length;
  
    return(
        <>
            {error && <p>{error}</p>}
            {!error &&
                <div>
                    <div className="header">
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

                    <ul className="display-books">
                        {booksToDisplay.map((book,index) => {
                            return  <BookCard key={book.id} token={token} book={book} index={index} />  
                        })}
                    </ul>
                </div>
            }
        </>
    )
}