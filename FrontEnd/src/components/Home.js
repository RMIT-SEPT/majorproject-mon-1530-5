import React from "react";
import CalendarHome from "./CalendarHome";
import logo from '../images/logo.png';
import ServiceHome from "./ServiceHome";

function Home(props) {
  return (
    <div>
      <div className="container mx-auto pt-5">
       <div> <img  src={logo} alt="logo"  className="center"/></div>
      </div>
      <br />
      {/*Booking Button*/}
      <div class="buttonBook"><button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      onclick="http://localhost:3000/AddEmployee;" type="button"onClick= {()=>{props.history.push('/ServiceHome')
      }}>Book a Service</button> </div>
      {/*Booking Calender*/}
      <div className="flex justify-evenly mx-5 my-5 py-5">
      <CalendarHome/></div>

    </div>
  );
}


export default Home;
