import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavigationBar from '../src/Frontend/Components/Navbar/Navbar.jsx'
import Home from './Frontend/Components/Home/Home.jsx';
import Login from './Frontend/Components/Login/Login.jsx';
import Post from './Frontend/Components/Post/Post.jsx';
import Register from './Frontend/Components/Register/Register.jsx';
import Error from './Frontend/Components/Error/Error.jsx';
import Profile from './Frontend/Components/Profile/Profile.jsx';
import withAuth from './Frontend/Components/HOCs/withAuth.js'
import withGuest from './Frontend/Components/HOCs/withGuest.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const ProtectedProfile = withAuth(Profile)
  const ProtectedPost = withAuth(Post)
  const GuestLogin = withGuest(Login)
  const GuestRegister = withGuest(Register)
  return (
   <BrowserRouter>
      <NavigationBar/>
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
