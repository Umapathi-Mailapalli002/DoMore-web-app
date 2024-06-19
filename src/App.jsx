import { useState } from 'react'
import React, { Component } from 'react'
import { auth } from './firebase.util'
import './App.css'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import { useAuthState } from "react-firebase-hooks/auth"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {
  const [user] = useAuthState(auth);
  return (
    <>
        {!user ? <LoginPage /> : <HomePage />}
    </>
  )
}

export default App
