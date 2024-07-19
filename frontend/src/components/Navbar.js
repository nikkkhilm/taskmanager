import React from 'react'
import './Navbar.css'
import { IoBookmarks } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Navbar = () => {

   const dispatch = useDispatch();

  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  // console.log(isLoggedIn);

  const logout=()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand" to="#"><b><IoBookmarks /> &nbsp;TASK MANAGER</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active mx-2" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active mx-2" aria-current="page" to="/about">About Us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active mx-2" aria-current="page" to="/todo">TASKS</Link>
        </li>


        {/* here using redux state isloggedin if false it will show sigin sign uo else logout */}
        {!isLoggedIn && 
        <> 
        <li className="nav-item">
          <Link className="nav-link active btn-nav mx-2 my-lg-0 my-2 text-center" aria-current="page" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active btn-nav mx-2 my-lg-0 my-2 text-center" aria-current="page" to="/signin">Sign In</Link>
        </li>
        </> 
        }
       
       {
        isLoggedIn &&  <li className="nav-item">
          <Link className="nav-link active btn-nav mx-2" aria-current="page" to="#" onClick={logout}>Log Out</Link>
        </li>
       }
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar;