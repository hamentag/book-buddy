import { useState, useEffect } from "react";
import { fetchAllbooks } from "../api";
import BookCard from "./BookCard"

export default function Books({token, setMsg}){
    const [books, setBooks] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const [availFilter, setAvailFilter] = useState(null); // Checkbox input state for "Show Only Available Books" option
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [checkedOut, setCheckedOut] = useState(null);  // useEffect dependency : re-execute the effect when a book is checked out

    useEffect(() => {
        async function getBooks() {
          try{
            const APIResponse = await fetchAllbooks();
            setBooks(APIResponse.books);
            setIsLoading(false);
          } catch(err){
            console.error(err)
            setError("Oops Something went wrong!");
          }
        }
        getBooks();
    }, [checkedOut]);

    //
    const searchedBooks = searchParam ? 
    books.filter(book =>
        book.title.toLowerCase().includes(searchParam)
    )
    : books;

    //
    const booksToDisplay = availFilter?
    searchedBooks.filter(book => book.available === true)
    : searchedBooks;

    //
    const numBooks = booksToDisplay.length;

    
    if(isLoading){
        return <section className="loading">Loading..</section>
    }
    
    return(
        <div className="home">
           <div className="avail-option">
            <label>
                    <input type="checkbox" id="avail" onChange={(e)=>setAvailFilter(e.target.checked)} />
                    {" "} Show Only Available Books
                </label>
           </div>
            {error && <p>{error}</p>}
            {!error &&
                <div>
                    <div className="search-header">
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
                                Number of {availFilter? <span>Available</span> : <span>All the</span>} Books in the Library: {numBooks}
                            </h3>
                        }
                    </div>

                    <ul className="display-books">
                        {booksToDisplay.map((book,index) => {
                            return  <BookCard key={book.id} token={token} book={book} index={index} setMsg={setMsg} setCheckedOut={setCheckedOut} />  
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}
