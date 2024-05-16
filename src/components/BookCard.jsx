import { useNavigate } from "react-router-dom";
import { updateBook } from "../api";

export default function BookCard({token, book, index}){
    const navigate = useNavigate();

    async function checkOut(bookId){
        try{
            const apiData = await updateBook(token, bookId, false);
            console.log(apiData)
    
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li key={book.id} className="book-presentation">
            <h5>{index + 1}. {book.title}</h5>
            <img
                src={book.coverimage}
                alt="Coverimage is not available"
                height={125}
                width={110}
            />

            <div className="buttons">
                <button
                    onClick={() => {
                        navigate(`/${book.id}`);
                    }}
                >See Details
                </button>
                <button
                    onClick={() => {
                        checkOut(book.id)
                    }}
                >Check Out
                </button>
            </div>
            
        </li>

    );
}
