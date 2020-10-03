import React from "react";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import{ logout } from "../actions/authAction"

function Navbar(props) {
  const {isLoggedIn,user} = props 
  const adminLink = "/profile"
  const userLink = "/bookings"
  let link;
  if(user != null){
    if(user.role === "ROLE_ADMIN"){
      link = adminLink
    }
    else if (user.role === "ROLE_CUSTOMER"){
      link = userLink
    }
  }
  console.log(props)
  return (
    <div>
      <nav>
        <div className="flex justify-between bg-blue-100">
          <NavLink to="/" className="text-gray-700 text-center  px-4 py-2 m-2">
            Book.com
          </NavLink>
          {isLoggedIn ?
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
          </div>:null}
          <div className="flex justify-end bg-blue-100">
          {isLoggedIn ?
          <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
            <NavLink to={link}>{user.username} </NavLink>
          </div>
          :<div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
            <NavLink to="/login"> Login </NavLink>
          </div>
        }
          {isLoggedIn ?
          <div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
            <a onClick={props.logout}>Logout </a>
          </div>:<div className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full">
          <NavLink to="/register"> Register</NavLink>
          </div>
        }
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
