import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { fetchUser } from "../api";

export default function Account({token, setNextPath}){
    const [user, setUser] = useState({}); 
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
    async function getUserAccount() {
        try{
          const APIResponse = await fetchUser(token);
          if(APIResponse.id){
            setUser(APIResponse)
            setBooks(APIResponse.books)
            }
            else{
                setError(APIResponse.message)
            }    
        } catch(err){
          console.error(err)
          setError("Oops Something went wrong!");
        }
      }

      if(token){
        getUserAccount();       
    }
    }, [token]);

    
    return(
        <div className='account'>{token?
            <>
                {error && <p>{error}</p>}
                {!error && 
                    <>
                        {
                            user && 
                            <table className='account-info'>
                            <tbody>
                                <tr>
                                    <th scope="row">ID</th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First Name</th>
                                    <td>{user.firstname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last Name</th>
                                    <td>{user.lastname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{user.email}</td>
                                </tr> 
                                <tr>
                                    <th scope="row">Books</th>
                                    <td className='book-info'>
                                        {
                                            books.length?
                                                <table className='book-table'>
                                                    <tbody>
                                                        <tr>
                                                            <th></th>
                                                            <th >Title</th>
                                                            <th >Author</th>
                                                            <th >ID</th>
                                                            <th >Availability</th>
                                                        </tr>
                                                        {
                                                            books.map((book,index) => { return <tr key={book.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{book.title}</td>
                                                                    <td>{book.author}</td>
                                                                    <td>{book.id}</td>
                                                                    <td>{book.available? <span>Yes</span> : <span>No</span>}</td>                                                   
                                                            </tr>})
                                                        }
                                                    </tbody>
                                                </table>
                                                :
                                                <p>No reservations found for this account.</p>
                                        }                                      
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                        }
                    </>
                }
            </>

            : <>
                <p>Please sign in to explore your account information.</p>
                <button className='login-btn' 
                        onClick={()=>{
                            setNextPath(location.pathname);
                            navigate('/login')
                        }}>Log In</button>
            </>
        }
        </div>
    )
}