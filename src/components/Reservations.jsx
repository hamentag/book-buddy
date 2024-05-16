
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { fetchReservations } from "../api";
import { deleteReservation } from "../api";

export default function Reservations({token, setMsg, setNextPath}){
    const [reservations, setreseRvations] = useState([]);

    const [error, setError] = useState(null);
    const [deletedReservation, setDeletedReservation] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
    async function getReservations() {
        try{
          const APIResponse = await fetchReservations(token);
          setreseRvations(APIResponse.reservation)
          
        } catch(err){
          console.error(err)
          setError("Oops Something went wrong!");
        }
      }

      if(token){
        getReservations();       
    }
    }, [deletedReservation, token]);

    async function returnBook(reservationId){
        try{
            const APIResponse = await deleteReservation(token, reservationId);
            setDeletedReservation(APIResponse.deletedReservation)      
            
          } catch(err){
            console.error(err)
            setError("Oops Something went wrong!");
          }
    }

    async function handleReturn(reservationId){
        setMsg({
            msgTxt: "Are you sure you want to return this book?",  // Confirmation msg
            propo: <button
                    onClick={() => {
                        returnBook(reservationId); 
                        setMsg(null);
                    }}
                    >Yes
                    </button>,
        });
    }
    
    return(
        <>{token?
            <>
                {error && <p>{error}</p>}
                {!error && (
                    reservations.length?
                        <table className='reservations'> 
                            <tbody>
                                <tr>
                                    <th ></th>
                                    <th >Title</th>
                                    <th >Author</th>
                                    <th >ID</th>
                                    <th >Availability</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    reservations.map((book) => {
                                        return <tr key={book.id}>
                                            <td> <img
                                                src={book.coverimage}
                                                alt="Coverimage"
                                                height={55}
                                                width={45}
                                                />
                                            </td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.id}</td>
                                            <td>{book.available ? <span>Yes</span> : <span>No</span>}</td>
                                            <td><button onClick={() => { handleReturn(book.id) }}>Return</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <p>No reservations found for this account.</p>
                )}
            </>
            : <>
                <p>Login required to view your reservation details.</p>
                <button className='login-btn' 
                        onClick={()=>{
                            setNextPath(location.pathname)
                            navigate('/login')
                        }}>Log In</button>
            </>
        }
        </>
    )
}