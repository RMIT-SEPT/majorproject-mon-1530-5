import React, {Component, useState} from 'react';
import hamburger from "../images/hamburger.png";
import { Link } from "react-router-dom";
import * as AiIcons from 'react-icons/ai';
import '../css/SideBar.css';
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import{ logout } from "../actions/authAction"
import * as FaIcons from 'react-icons/fa';

function SideNavBar(props){

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
    const [SideNavBar, setSideNavBar] = useState(false)
    const showSideNavBar = () => setSideNavBar(!SideNavBar)
        return (
    <>
        <div className ="sideNavBar">
            <Link to="#" ><FaIcons.FaBars size={30} style={{ "color": 'white' }}  onClick={showSideNavBar} className="bars-image"/></Link>
            <div className="website-name">
                                  <NavLink to="/" className="WebsiteName">
                                    Book.com
                                  </NavLink></div>
        </div>
        <nav className={SideNavBar ? 'nav-menu-active' : 'nav-menu'} >
        <ul className='nav-menu-items' onClick={showSideNavBar}>
        <li className="navbar-toggle">
          <Link to="#" className='close' ><AiIcons.AiOutlineClose size={30} style={{ "color": 'white' }} /> </Link > </li>
            {isLoggedIn ?
            <div>
            <NavLink to="/" className ="nav-text">Home</NavLink>
            <NavLink to="/about" className ="nav-text">About</NavLink>
            <NavLink to="/contacts" className ="nav-text">Contact</NavLink>
            </div>:null}
            {isLoggedIn ?
            <div>
            <NavLink to={link} className ="nav-text">{user.username}</NavLink>
            </div>
            :<div className="">
            <NavLink to="/" className ="nav-text">Login</NavLink>
            </div> }
            {isLoggedIn ?
            <div className="">
            <NavLink onClick={props.logout} to="/login" className ="nav-text">Logout </NavLink>
            </div>:
            <div>
            <NavLink to="/register" className ="nav-text">Register</NavLink>
            </div>
            }
            </ul>

        </nav> </>

        )


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

export default connect(mapStateToProps,mapDispatchToProps)(SideNavBar)

