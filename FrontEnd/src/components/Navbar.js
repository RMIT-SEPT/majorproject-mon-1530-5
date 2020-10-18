import React from "react";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import{ logout } from "../actions/authAction"
import '../css/NavBar.css';

function Navbar(props) {
  const {isLoggedIn,user} = props 
  const adminLink = "/admin"
  const userLink = "/bookings"
  const employeeLink = "/employee"
  let link;
  if(user != null){
    if(user.role === "ROLE_ADMIN"){
      link = adminLink
    }
    else if (user.role === "ROLE_CUSTOMER"){
      link = userLink
    }
    else if (user.role === "ROLE_EMPLOYEE"){
      link = employeeLink
    }
  }
  console.log(props)
  return (
    <div>
      <nav>
        <div className="MainContainer">
          <NavLink to="/" className="WebsiteName">
            Book.com
          </NavLink>
          {isLoggedIn ?
          <div className="LoggedButtons">
            <div className="NavBarButton">
              <NavLink to="/">Home</NavLink>
            </div>
            <div className="NavBarButton">
              <NavLink to="/about">About</NavLink>
            </div>
            <div className="NavBarButton">
              <NavLink to="/contacts">Contact Us</NavLink>
            </div>
          </div>:null}
          <div className="NonLoggedButtons">
          {isLoggedIn ?
          <div className="NavBarButton">
            <NavLink to={link}>{user.username} </NavLink>
          </div>
          :<div className="NavBarButton">
            <NavLink to="/login">Login</NavLink>
          </div>
        }
          {isLoggedIn ?
          <div className="NavBarButton">
            <NavLink onClick={props.logout} to="/login">Logout </NavLink>
          </div>:<div className="NavBarButton">
          <NavLink to="/register">Register</NavLink>
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
