import React from "react";
import CalendarHome from "./CalendarHome";
import logo from '../images/logo.png';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

function Home(props) {
  if(props.user !== null)  {
    if(props.user.role === "ROLE_EMPLOYEE"){
      return <Redirect to="/about"/>
    } 
  }else{
    return <Redirect to="/login"/>
  }
  
  
  return (
    <div>
      <div className="container mx-auto pt-5">
       <div className="container mx-auto"> <img className="object-scale-down h-48 w-full" src={logo} alt="logo"/></div>

        {/*Description of home page (visible to users*/}
          <br />
          <p className="text-center text-2xl font-auto"> Welcome to BookMe! </p>
      </div>

      {/*Booking Calender*/}
      <div className="flex justify-evenly mx-5 my-5 py-5">
      <CalendarHome/>
      </div>

    </div>
  );
}
function mapStateToProps(state) {
  return{
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError,
   user:state.auth.user
  }
}


export default connect(mapStateToProps)(Home);
