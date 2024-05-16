import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import bookLogo from './assets/books.png'
import Navigations from './components/Navigations'

import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import Reservations from './components/Reservations'

import DialogBox from "./components/DialogBox"

import { fetchUser } from "./api";
import {getCookie} from './cookie/cookie'
import {setCookie} from './cookie/cookie'


function App() {
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [usr, setUsr] = useState({});
  const [nextPath, setNextPath] = useState('/');

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserAccount(ctoken) {
      try{
        const APIResponse = await fetchUser(ctoken);
        if(APIResponse.id){
          setUsr(APIResponse);
          setToken(ctoken)        
          }
          else{
              setError(APIResponse.message)
          }    
      } catch(err){
        console.error(err)
        setError("Oops Something went wrong!");
      }
    }

    let ctoken = getCookie("token");
    if (ctoken != "") {
      getUserAccount(ctoken);
    }     
  }, [token]);

  return (
    <div className="App">
     <div className="header">
      <div className="top">
          <h1 onClick={()=>{
            navigate('/')
          }}><img id='logo-image' src={bookLogo}/>Book Buddy</h1>
          {token? 
            <div className="authentication">
              {!error && <div onClick={()=>{
                navigate('/account')
              }}
              >{usr.firstname}</div>}

              <button onClick={()=>{
                setToken(null);
                setCookie("token", token, -1);     // Delete cookie: set the expires param to a past date
              }}
              >Log Out</button>
            </div>
            : <Link to="/login">Log In</Link>
          }
      </div>  

      <Navigations />
      {msg && <DialogBox msg={msg} setMsg={setMsg}/>}
     </div>
     <div className="routes">
      <Routes>
          <Route path="/" element={<Books token={token} setMsg={setMsg} />} />
          <Route path="/:id" element={<SingleBook />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login token={token} setToken={setToken} setMsg={setMsg} nextPath={nextPath} />} />
          <Route path="/account" element={<Account token={token} setNextPath={setNextPath}/>} /> 
          <Route path="/reservations" element={<Reservations token={token} setMsg={setMsg} setNextPath={setNextPath}/>} /> 
        </Routes>
     </div>
    </div>
  )
}

export default App