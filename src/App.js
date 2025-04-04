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

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route Component={Home} path='/' />
        <Route Component={Login} path='/login' />
        <Route Component={Post} path='/post/:id' />
        <Route Component={Profile} path='/Profile/:id' />
        <Route Component={Register} path='/register' />
        <Route Component={Error} path='/*'/>
      </Routes>

   </BrowserRouter>
  );
}

export default App;
