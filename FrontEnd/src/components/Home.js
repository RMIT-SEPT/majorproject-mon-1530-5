import React from "react";
import CalendarHome from "./CalendarHome";
import logo from '../images/logo.png';

function Home() {
  return (
    <div>
      <div className="container mx-auto pt-5">
       <div> <img  src={logo} alt="Logo" className="center" /></div>

        {/*Description of home page (visible to users*/}
          <br />
          <p className="text-center text-2xl font-auto"> Welcome to BookMe! </p>
      </div>

      {/*Booking Calender*/}
      <div className="flex justify-evenly mx-5 my-5 py-5">
      <CalendarHome/></div>

    </div>
  );
}


export default Home;
