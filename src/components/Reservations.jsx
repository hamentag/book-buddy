
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { fetchReservations } from "../api";
import { deleteReservation } from "../api";

export default function Reservations({token}){
    const [reservations, setreseRvations] = useState([]);

    const [error, setError] = useState(null);
    const [deletedReservation, setDeletedReservation] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
    async function getReservations() {
        try{
          const APIResponse = await fetchReservations(token);
          console.log(APIResponse.reservation)
          setreseRvations(APIResponse.reservation)
          
          
        } catch(err){
          console.error(err)
          setError("Oops Something went wrong!");
        }
      }

      if(token){
        getReservations();       
    }
    }, [deletedReservation]);

    //
    async function returnBook(reservationId){
        try{
            const APIResponse = await deleteReservation(token, reservationId);
            console.log(APIResponse)  
            setDeletedReservation(APIResponse.deletedReservation)      
            
          } catch(err){
            console.error(err)
            setError("Oops Something went wrong!");
          }

    }

   
    ///
    
    return(
        <>{token?
            <>
                {error && <p>{error}</p>}
                {!error && 
                    <table>
                    <tbody>
                        <tr>
                    <th >Title: </th>
                <th >Author: </th>
                <th >ID: </th>
                <th >Availability: </th>
                <th>Action</th>
                </tr>
                    {
                        reservations.map((book) => { return <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.id}</td>
                                <td>{book.available? <span>Yes</span> : <span>No</span>}</td>   
                                <td><button onClick={()=>{returnBook(book.id)}}>Return</button></td>                                                
                           </tr>})
                    }
                    </tbody>
                </table>     
                }
            </>

            : <>
                <p>"Not connect... log in .. from Reservations"</p>
                <button onClick={()=>{navigate('/login')}}>LogIn</button>           
            </>
        }

        //
        

        </>
    )
}