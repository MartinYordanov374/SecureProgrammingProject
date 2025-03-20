import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Post from './Components/Post';
import Register from './Components/Register';
import Error from './Components/Error';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route Component={Home} path='/'/>
        <Route Component={Login} path='/login'/>
        <Route Component={Post} path='/post/:id'/>
        <Route Component={Register} path='/register'/>
        <Route Component={Error} path='/*'/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
