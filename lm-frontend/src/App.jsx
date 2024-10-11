
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Component/AuthenticationComponent/Login'
import NavbarComponent from './Component/NavbarComponent'
import Register from './Component/AuthenticationComponent/Register'

function App() {

  return (
    <>
      <BrowserRouter>
      <NavbarComponent></NavbarComponent>
        <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
