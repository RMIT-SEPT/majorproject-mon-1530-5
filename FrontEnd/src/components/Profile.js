import React from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

function Profile(props) {
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
        <div className="flex justify-center py-5">
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
                data-test="addShift"
                onClick= {()=>{
                  props.history.push('/addShift')
                }}
              >
                Add Shift
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

export default connect(mapStateToProps)(Profile);
