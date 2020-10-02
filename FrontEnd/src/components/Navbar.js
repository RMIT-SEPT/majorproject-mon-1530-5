import React from "react";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import{ logout } from "../actions/authAction"

function Navbar(props) {
  const {isLoggedIn,user} = props 
  console.log(props)
  return (
    <div>
      <nav>
        <div className="flex justify-between bg-blue-100">
          <NavLink to="/" className="text-gray-700 text-center  px-4 py-2 m-2">
            Book.com
          </NavLink>
          <div className="flex justify-center bg-blue-100">
            <div className="text-black-700 text-center hover:bg-blue-500  px-4 py-2 m-2 rounded-full">
              <NavLink to="/"> Home</NavLink>
            </div>
            <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
              <NavLink to="/about"> About</NavLink>
            </div>
            <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
              <NavLink to="/contacts"> Contact Us</NavLink>
            </div>
          </div>
          <div className="flex justify-end bg-blue-100">
          <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
             {isLoggedIn ? <NavLink to="/profile">{user.username} </NavLink>: null}
            </div>
            <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
             {isLoggedIn ? null:  <NavLink to="/bookings"> Bookings</NavLink>}
            </div>
            <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
            {isLoggedIn ? <a onClick={props.logout}>Logout </a>: <NavLink to="/login">Login </NavLink>}
            </div>
            <div className="text-black-700 text-center hover:bg-blue-500 active:bg-blue-500 px-4 py-2 m-2 rounded-full">
            {isLoggedIn ? null:  <NavLink to="/register"> Register</NavLink>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapDispatchToProps=(dispatch) =>{
  return{
    logout:() => dispatch(logout())
  }
  }

function mapStateToProps(state) {
  return{
   isLoggedIn:state.auth.isLoggedIn,
   user:state.auth.user
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
