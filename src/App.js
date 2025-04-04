import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Post from './Components/Post';
import Register from './Components/Register';
import Error from './Components/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Components/Profile';
import withAuth from './Components/HOCs/withAuth'
import withGuest from './Components/HOCs/withGuest'
function App() {
  const ProtectedProfile = withAuth(Profile)
  const ProtectedPost = withAuth(Post)
  const GuestLogin = withGuest(Login)
  const GuestRegister = withGuest(Register)
  return (
   <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/' />
        <Route element={<Error/>} path='/*'/>
        <Route element={<GuestLogin/>} path='/login' />
        <Route element={<GuestRegister/>} path='/register' />
        <Route element={<ProtectedPost/>} path='/post/:id' />
        <Route element={<ProtectedProfile/>} path='/profile/:id' />
       
      </Routes>

   </BrowserRouter>
  );
}

export default App;
