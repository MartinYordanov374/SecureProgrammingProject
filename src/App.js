import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Post from './Components/Post/Post.jsx';
import Register from './Components/Register/Register.jsx';
import Error from './Components/Error/Error.jsx';
import Profile from './Components/Profile/Profile.jsx';
import withAuth from './Components/HOCs/withAuth.js'
import withGuest from './Components/HOCs/withGuest.js'
import 'bootstrap/dist/css/bootstrap.min.css';

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
