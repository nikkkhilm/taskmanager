import React, {  useEffect } from 'react'
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from './components/signup/Signup';
import Signin from './components/signup/Signin';
import Todo from './components/todo/Todo';
import { useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {

  const dispatch=useDispatch();

  useEffect(() => {
   const id=sessionStorage.getItem("id");
   if(id)
   {
  dispatch(authActions.login());
   }
  }, []);
  

  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/todo' element={<Todo/>}/>

    </Routes>
   </Router>
    <Footer/>
   </>
  );
}

export default App;
