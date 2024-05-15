import { Routes, Route } from "react-router-dom";
import { useState } from 'react'

import Navigations from './components/Navigations'

import Books from './components/Books'
import SingleBook from './components/SingleBook'


import { useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null)

  const navigate = useNavigate();

  return (
    <>
      <Navigations />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/:id" element={<SingleBook />} />
      </Routes>
    </>
  )
}

export default App