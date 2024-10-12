
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Component/Authentication/Login'
import NavbarComponent from './Component/NavbarComponent'
import Register from './Component/Authentication/Register'
import SidebarComopnent from './Component/Admin/SidebarComopnent'
import AdminComopnent from './Component/Admin/AdminComopnent'
import { isAdminUser, isUserLoggedIn } from './Services/AuthService'

function App() {

  function AuthenticatedRoute({ children }) {

    const isAuth = isUserLoggedIn();

    if (isAuth && isAdminUser()) {
      return children;
    }

    return <Navigate to="/login" />

  }

  function AuthenticatedRouteForUser({ children }) {
    const isAuth = isUserLoggedIn()
    if (isAuth) {
      return children
    }
    return <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/admin' element={
            <AuthenticatedRoute>
              <AdminComopnent />
            </AuthenticatedRoute>
          }></Route>
          <Route></Route>
          <Route path='/home' element={<NavbarComponent />}></Route>
          <Route path='/admin/*' element={
            <AuthenticatedRoute>
              <AdminComopnent />
            </AuthenticatedRoute>
          } />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
