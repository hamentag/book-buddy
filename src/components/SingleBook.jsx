import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleBook } from "../api";
export default function SingleBook(){
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getSingleBook() {
          try{
            const APIResponse = await fetchSingleBook(id);
            setBook(APIResponse.book);
          } catch(err){
            console.error(err)
            setError("Oops Something went wrong!");
          }
        }
        getSingleBook();
      }, []);

    return (
        <div>
            {error && <p>{error}</p>}

            {
                book && (
                    <div>
                        <h5>Detailed info about {book.title}</h5>
                        <div className="single-book">
                            <img
                                src={book.coverimage}
                                alt="Coverimage is not available"
                                height={270}
                            />
                            <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th scope="row">ID</th>
                                        <td>{book.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Title</th>
                                        <td>{book.title}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Author</th>
                                        <td>{book.author}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Description</th>
                                        <td>{book.description}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Availability</th>
                                        <td>{book.available ? <span>Yes</span> : <span>No</span>}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
