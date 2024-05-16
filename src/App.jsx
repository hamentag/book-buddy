import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react'
import bookLogo from './assets/books.png'
import Navigations from './components/Navigations'

import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'


function App() {
  const [token, setToken] = useState(null)

  const navigate = useNavigate();

  return (
    <>
      <p>token ..: {token}</p>
      <Navigations />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/:id" element={<SingleBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />}/>
      </Routes>
    </>
  )
}

export default App