import React from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

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
      <div className="text-gray-700 text-center px-8 py-5 absolute right-0">
        <button
        className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
        data-test="changePassword"
        onClick={() => {
          props.history.push('/changePassword')}
        }>
        Change Password
        </button>
      </div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl">My Dashboard</h1>
        <div className="flex justify-center py-5">
        <div className="text-gray-700 text-center  px-4 py-5 m-2">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                data-test="addService"
                onClick= {()=>{
                  props.history.push('/addService')
                }}
              >
                Add Service
              </button>
         </div>
        <div className="text-gray-700 text-center  px-4 py-5 m-2">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                data-test="addEmployee"
                onClick= {()=>{
                  props.history.push('/addEmployee')
                }}
              >
                Add Employee
              </button>
         </div>
         <div className="text-gray-700 text-center  px-4 py-5 m-2">
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            data-test="setAvailability"
            onClick= {()=>{
              props.history.push('/setAvailability')
            }}
          >
            Set Availability
          </button>
        </div>
         <div className="text-gray-700 text-center  px-4 py-5 m-2">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              data-test="addShift"
              onClick= {()=>{
                props.history.push('/addShift')
              }}
            >
              Add Shift
            </button>
          </div>
          <div className="text-gray-700 text-center  px-4 py-5 m-2">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
