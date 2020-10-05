import React from "react";
import step1 from '../images/1.png';
import step2 from '../images/2.png';
import step3 from '../images/3.png';
import step4 from '../images/4.png';
import adminStep1 from '../images/a1.png';
import adminStep2 from '../images/a2.png';
import adminStep3 from '../images/a3.png';
import adminMobile1 from '../images/adminMobile1.png';
import adminMobile2 from '../images/adminMobile2.png';
import adminMobile3 from '../images/adminMobile3.png';
import adminMobile4 from '../images/adminMobile4.png';
import adminMobile5 from '../images/adminMobile5.png';

import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import "../css/About.css";

function About(props) {
  if(props.user === null)  {
    return <Redirect to="/login"/>
  }
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
      else if (user.role === "ROLE_EMPLOYEE"){
        link = '/about'
      }
    }
  return (
    <div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl font-mono">About</h1>
        {/*Description of page (visible to users*/}
        <h2 className="text-center">
        BookMe is a company specialising in providing any service you want!
        <br /> At BookMe we are determined to offer world class services from our workers to our customers.
        <br /> Our session times are flexible and allow you to choose any day or hour of the week.</h2>
        <br />
        {isLoggedIn && user.role === "ROLE_CUSTOMER" ?
        <>
        <h3 className="text-center text-2xl font-mono">How To Book</h3>
        <br />
        <p>1. Select the service you want from the drop down box. You can choose multiple services</p> <br />
        <img className="img" src={adminStep1} alt="step1"/>
        <img className="imgMobile" src={adminMobile1} alt="aM1"/>
        <p>2. Select the date you want for the service</p><br />
        <img className="img" src={adminStep2} alt="step2"/>
        <img className="imgMobile" src={adminMobile2} alt="aM2"/>
        <p>4. Once you are happy with your selection, click "Book"!</p><br />
        <img className="img" src={adminMobile5} alt="step4"/>
        <img className="imgMobile" src={adminMobile5} alt="aM5"/>
        <p>5. You have successfully booked! </p>
        </>:null}

        {isLoggedIn && user.role === "ROLE_ADMIN" ?
        <>
        <h3 className="text-center text-2xl font-mono">How To Book On Behalf of a Customer</h3>
        <br />
        <p>1. To book a service for a customer, first select the service you want</p> <br />
        <img className="img" src={adminStep1} alt="a1"/>
        <img className="imgMobile" src={adminMobile1} alt="aM1"/>
        <p>2. Select the date you want for the service</p><br />
        <img className="img" src={adminStep2} alt="a2"/>
        <img className="imgMobile" src={adminMobile2} alt="aM2"/>
        <p>4. Once you are happy with your selection, enter the customer details then click "Book"!</p><br />
        <img className="img" src={adminStep3} alt="a3"/>
        <img className="imgMobile" src={adminMobile3} alt="aM3"/>
        <img className="imgMobile" src={adminMobile4} alt="aM4"/>
        <img className="imgMobile" src={adminMobile5} alt="aM5"/>
        <p>5. You have successfully booked on behalf of the customer! </p>
        </>:null}

        {isLoggedIn && user.role === "ROLE_EMPLOYEE" ?
        <>
        <h3 className="text-center text-2xl font-mono">How To Book On Behalf of a Customer</h3>
        <br />
        <p>1. To view all of your past and current bookings, click on your username on the top right corner</p> <br />
        </>:null}

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

export default connect(mapStateToProps)(About);
