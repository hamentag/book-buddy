import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import bookLogo from './assets/books.png'
import Navigations from './components/Navigations'

import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'


function App() {
  const [token, setToken] = useState(null)

  return (
    <div className="App">
      <p>token ..: {token}</p>
      <Navigations />
      <Routes>
        <Route path="/" element={<Books token={token}/>} />
        <Route path="/:id" element={<SingleBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />}/>
        <Route path="/account" element={<Account token={token} />} />
      </Routes>
      </div>
  )
}

export default App