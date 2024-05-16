import { useNavigate } from "react-router-dom";
import { updateBookAv } from "../api";

export default function BookCard({token, book, index, setMsg, setCheckedOut}){
    const navigate = useNavigate();

    async function checkOut(){
        if(!token){
            setMsg({
                msgTxt: "This action is available to logged-in users only. Please log in to proceed",
                propo: <button
                        onClick={() => {  navigate('/login'); setMsg(null) }}
                        >Log In
                        </button>,
            });
        }
        else if(book.available){
            try{
                const apiData = await updateBookAv(token, book.id, false);
                setCheckedOut(apiData.book.id);
                setMsg({
                    msgTxt: `You have successfully completed the check-out process for this book: "${book.title}"`,
                    propo: <button
                            onClick={() => { setMsg(null) }}
                            >OK
                            </button>,
                });        
            } catch (err) {
                console.error(err)
            }            
        }
        else{
             setMsg({
                msgTxt: "This book is not currently available for checkout. Please try again later.",
                propo: <button
                        onClick={() => {  navigate('/'); setMsg(null) }}
                        >See other books
                        </button>,
            })
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
            </div>
            
        </li>
    );
}
