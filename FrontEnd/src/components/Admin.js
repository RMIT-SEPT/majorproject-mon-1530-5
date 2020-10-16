import React from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../css/Admin.css';

function Admin(props) {
  // Route guarding in case the user is not logged in or has a different role 
  if(props.user !== null)  {
    if(props.user.role !== "ROLE_ADMIN"){
      return <Redirect to="/about"/>
    } 
  }else{
    return <Redirect to="/login"/>
  }
  
  return (
    <div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl">My Dashboard</h1>
        <div className="parent">
        <div className="buttonPosition">
              <button
                className="buttonColor"
                type="button"
                data-test="addService"
                onClick= {()=>{
                  props.history.push('/addService')
                }}
              >
                Add Service
              </button>
         </div>
        <div className="buttonPosition">
              <button
                className="buttonColor"
                type="button"
                data-test="addEmployee"
                onClick= {()=>{
                  props.history.push('/addEmployee')
                }}
              >
                Add Employee
              </button>
         </div>
         <div className="buttonPosition">
          <button
                className="buttonColor"
            type="button"
            data-test="setAvailability"
            onClick= {()=>{
              props.history.push('/setAvailability')
            }}
          >
            Set Availability
          </button>
        </div>
         <div className="buttonPosition">
            <button
                className="buttonColor"
              type="button"
              data-test="addShift"
              onClick= {()=>{
                props.history.push('/addShift')
              }}
            >
              Add Shift
            </button>
          </div>
          <div className="buttonPosition">
            <button
                className="buttonColor"
              type="button"
              data-test="bookings"
              onClick= {()=>{
                props.history.push('/bookings')
              }}
            >
              View Customer Bookings
            </button>
          </div>  
      <hr/>
      </div>
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

export default connect(mapStateToProps)(Admin);
