import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { updateBookAv } from "../api";


export default function BookCard({token, book, index, setMessage}){
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    async function checkOut(){
        if(token){
            if(book.available){
                try{
                    const apiData = await updateBookAv(token, book.id, false);
                    console.log(apiData)
            
                } catch (err) {
                    console.error(err)
                }            
            }
            else{
                setError("Not avail...")
                setMessage("pr..Not avail...")
            }
        }
        else{
            setError("Login to check out item")
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
                        checkOut()
                    }}
                >Check Out
                </button>
                {error && <p>{error}</p>}
            </div>
            
        </li>

    );
}
