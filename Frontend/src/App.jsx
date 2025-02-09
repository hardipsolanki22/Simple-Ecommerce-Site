import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    navigate("/products")
  }, [])

  return (
    <>
      <Header />
      <Outlet/>
    </>
  )
}

export default App
