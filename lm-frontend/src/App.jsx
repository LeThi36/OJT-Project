
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Component/Authentication/Login'
import NavbarComponent from './Component/NavbarComponent'
import Register from './Component/Authentication/Register'
import SidebarComopnent from './Component/Admin/SidebarComopnent'
import { isAdminUser, isUserLoggedIn } from './Services/AuthService'
import FooterComponent from './Component/FooterComponent'
import LandingpageComoponent from './Component/User/LandingpageComoponent'
import CategoryComponent from './Component/User/CategoryComponent'
import UserTableComponent from './Component/Admin/UserTableComponent'
import UserProfileComponent from './Component/Admin/UserProfileComponent'
import BooktableComponent from './Component/Admin/BooktableComponent'



function App() {

  function AuthenticatedRoute({ children }) {

    const isAuth = isUserLoggedIn();

    if (isAuth && isAdminUser()) {
      return children;
    }

    return <Navigate to="/login" />

  }

  // function AuthenticatedRouteForUser({ children }) {
  //   const isAuth = isUserLoggedIn()
  //   if (isAuth) {
  //     return children
  //   }
  //   return <Navigate to="/" />
  // }

  return (
    <>
      
        <NavbarComponent />
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<LandingpageComoponent />}></Route>
          <Route path='/category' element={<CategoryComponent />}></Route>
          <Route path='/admin/*' element={
            <AuthenticatedRoute>
              <SidebarComopnent />
              <div className="ml-80 py-2 w-auto mt-6 mr-16">
                <Routes>
                  <Route path="user" element={<UserTableComponent />} />
                  <Route path='user/:id' element={<UserProfileComponent />} />
                  <Route path='book' element={<BooktableComponent />}/>
                </Routes>
              </div>
            </AuthenticatedRoute>
          } />
        </Routes>
        <FooterComponent />
    </>
  )
}

export default App
