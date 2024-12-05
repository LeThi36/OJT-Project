
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
import BookDetailComponent from './Component/Admin/BookDetailComponent'
import BookFormComponent from './Component/Admin/BookFormComponent'
import CategoryTableComponent from './Component/Admin/CategoryTableComponent'
import CategoryDetailComponent from './Component/Admin/CategoryDetailComponent'
import AuthorTableComponent from './Component/Admin/AuthorTableComponent'
import AuthorDetailCoponent from './Component/Admin/AuthorDetailCoponent'
import BooksCardComponent from './Component/User/BooksCardComponent'
import CategoryBooksComponent from './Component/User/CategoryBooksComponent'
import BookComponent from './Component/User/BookComponent'
import CartComponent from './Component/User/CartComponent'
import BorrowRecordTableComponent from './Component/Admin/BorrowRecordTableComponent'
import FavoriteBookComponent from './Component/User/FavoriteBookComponent'
import ChangePasswordComponent from './Component/Authentication/ChangePasswordComponent'
import ResetPasswordComponent from './Component/Authentication/ResetPasswordComponent'
import ForgotPasswordComopent from './Component/Authentication/ForgotPasswordComponent'
import BorrowRequestTableComponent from './Component/Admin/BorrowRequestTableComponent'
import DashBoardComponent from './Component/Admin/DashBoardComponent'



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
        <Route path='/change-password' element={<ChangePasswordComponent />}></Route>
        <Route path='/reset-password-request' element={<ForgotPasswordComopent />}></Route>
        <Route path='/reset-password/:token' element={<ResetPasswordComponent />}></Route>
        <Route path='/' element={<LandingpageComoponent />}></Route>
        <Route path='/cart' element={<CartComponent />}></Route>
        <Route path='/favorite' element={<FavoriteBookComponent />}></Route>
        <Route path='/books' element={<BooksCardComponent />}></Route>
        <Route path='/books/:id' element={<BookComponent />}></Route>
        <Route path='/category' element={<CategoryComponent />}></Route>
        <Route path='/category/:id' element={<CategoryBooksComponent />}></Route>
        <Route path='/user/:id' element={<UserProfileComponent />}></Route>
        <Route path='/admin/*' element={
          <AuthenticatedRoute>
            <SidebarComopnent />
            <div className="ml-80 py-2 w-auto mt-6 mr-16">
              <Routes>
                <Route path="user" element={<UserTableComponent />} />
                <Route path='user/:id' element={<UserProfileComponent />} />
                <Route path='book' element={<BooktableComponent />} />
                <Route path='book/:id' element={<BookDetailComponent />} />
                <Route path='book/add-new-book' element={<BookFormComponent />} />
                <Route path='category' element={<CategoryTableComponent />} />
                <Route path='category/:id' element={<CategoryDetailComponent />} />
                <Route path='author' element={<AuthorTableComponent />} />
                <Route path='author/:id' element={<AuthorDetailCoponent />} />
                <Route path='borrow' element={<BorrowRecordTableComponent />} />
                <Route path='request' element={<BorrowRequestTableComponent />} />
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
