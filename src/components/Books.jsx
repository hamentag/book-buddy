import { useState, useEffect, useRef } from "react";
import { fetchAllbooks } from "../api";
import BookCard from "./BookCard"

export default function Books({token}){
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null)
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


      //// Handle message box
      const ref = useRef();
      const ref2 = useRef();

      useEffect(() => {
          ref.current.style.backgroundColor = message? "green" : "blue";
          ref.current.style.display = message? "block" : "none";
          ref.current.style.transform = message? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)";

         
      }, [message]);

      useEffect(() => {
        ref2.current.style.opacity = message? "1" : "0"
        ref2.current.style.pointerEvents = message? "all" : "none"
       
    }, [message]);

    ////

  
    return(
        <>

            <div ref={ref} className="dialog-box">
                <div className="dialog-box-main">
                    <p>TSt ,,,, tst ,,,,,</p>
                    <button onClick={()=>{setMessage(null)}}>Close</button>
                </div>
            </div>
            <div ref={ref2} className="overlay"></div>


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
                            return  <BookCard key={book.id} token={token} book={book} index={index} setMessage={setMessage}/>  
                        })}
                    </ul>
                </div>
            }
        </>
    )
}