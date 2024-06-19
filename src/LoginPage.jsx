import React from 'react'
import LoginNav from './loginNav'
import LoginPageBody from './LoginPageBody'
import LoginFooter from './LoginFooter'
import { Outlet } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
      <LoginNav />
      <Outlet />
      <LoginFooter />
    </div>
  )
}

export default LoginPage
