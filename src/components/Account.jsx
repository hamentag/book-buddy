import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api";

export default function Account({token}){
    const [user, setUser] = useState({}); 
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    async function getUserAccount() {
        try{
          const APIResponse = await fetchUser(token);
          if(APIResponse.id){
            setUser(APIResponse)
            setBooks(APIResponse.books)

            console.log(APIResponse.id);
            console.log(APIResponse.books);
            }
            else{
                console.log("no id ")
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
    }, []);

   
    ///
    
    return(
        <>{token?
            <>
                {error && <p>{error}</p>}
                {!error && 
                    <>Account heere .. 
                        {
                            user && 
                            <table>
                            <tbody>
                                <tr>
                                    <th scope="row">ID: </th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First Name: </th>
                                    <td>{user.firstname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last Name: </th>
                                    <td>{user.lastname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email: </th>
                                    <td>{user.email}</td>
                                </tr> 
                                <tr>
                                    <th scope="row">Books: </th>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                            <th >Title: </th>
                                        <th >Author: </th>
                                        <th >ID: </th>
                                        <th >Availability: </th>
                                        </tr>
                                            {
                                                books.map((book) => { return <tr key={book.id}>
                                                        <td>{book.title}</td>
                                                        <td>{book.author}</td>
                                                        <td>{book.id}</td>
                                                        <td>{book.available? <span>Yes</span> : <span>No</span>}</td>                                                   
                                                   </tr>})
                                            }
                                            </tbody>
                                        </table>                                       
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                        }
                    </>
                }
            </>

            : <>
                <p>"Need to log in"</p>
                <button onClick={()=>{navigate('/login')}}>LogIn</button>           
            </>
        }
        </>
    )
}