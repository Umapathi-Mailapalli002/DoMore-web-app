import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import About from './About.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import LoginPageBody from './LoginPageBody.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginPageBody/>
      },
      {
        path: "/About",
        element: <About/>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
