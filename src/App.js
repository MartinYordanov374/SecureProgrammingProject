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
import withAuth from './Components/HOCs/withAuth';

function App() {
  const ProtectedRegister = withAuth(Register)
  const ProtectedLogin = withAuth(Login)
  return (
   <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<ProtectedLogin />} path='/login' />
        <Route element={<Post />} path='/post/:id' />
        <Route element={<Profile />} path='/Profile/:id' />
        <Route element={<ProtectedRegister />} path='/register' />
        <Route element={<Error />} path='/*'/>
      </Routes>

   </BrowserRouter>
  );
}

export default App;
