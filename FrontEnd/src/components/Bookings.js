import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class Bookings extends Component {
  render() {
    // Route guarding in case the user is not logged in or has a different role 
    if(this.props.user !== null)  {
      if(this.props.user.role !== "ROLE_CUSTOMER"){
        return <Redirect to="/about"/>
      } 
    }else{
      return <Redirect to="/login"/>
    }
    return (
      <div className="container mx-auto py-5 flex flew-row justify-evenly">
        <div class="max-w-md rounded overflow-hidden shadow-xl">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center py-5">Barber</div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p class="text-gray-700 text-base">Status:</p>
                <p class="text-gray-700 text-base">Date:</p>
                <p class="text-gray-700 text-base">Start Time:</p>
                <p class="text-gray-700 text-base">End Time:</p>
                <p class="text-gray-700 text-base">Service Provider</p>
              </div>
              <div className="flex flex-col">
                <p class="text-gray-700 text-base text-green-500">Pending</p>
                <p class="text-gray-700 text-base">29/10/2020</p>
                <p class="text-gray-700 text-base">12:00</p>
                <p class="text-gray-700 text-base">14:00</p>
                <p class="text-gray-700 text-base">Jane Doe</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly py-2">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Reschedule
          </button>
          <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Cancel
          </button>
          </div>
        </div>
        <div class="max-w-md rounded overflow-hidden shadow-xl">
          <div class="px-6 py-5">
            <div class="font-bold text-xl mb-2 text-center py-5">Personal Trainer</div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p class="text-gray-700 text-base">Status:</p>
                <p class="text-gray-700 text-base">Date:</p>
                <p class="text-gray-700 text-base">Start Time:</p>
                <p class="text-gray-700 text-base">End Time:</p>
                <p class="text-gray-700 text-base">Service Provider</p>
              </div>
              <div className="flex flex-col">
                <p class="text-gray-700 text-base text-green-500">Pending</p>
                <p class="text-gray-700 text-base">29/10/2020</p>
                <p class="text-gray-700 text-base">12:00</p>
                <p class="text-gray-700 text-base">14:00</p>
                <p class="text-gray-700 text-base">Jane Doe</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly py-2">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Reschedule
          </button>
          <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Cancel
          </button>
          </div>
        </div>
        <div class="max-w-md rounded overflow-hidden shadow-xl">
          <div class="px-6 py-5">
            <div class="font-bold text-xl mb-2 text-center py-5">Dentist</div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p class="text-gray-700 text-base">Status:</p>
                <p class="text-gray-700 text-base">Date:</p>
                <p class="text-gray-700 text-base">Start Time:</p>
                <p class="text-gray-700 text-base">End Time:</p>
                <p class="text-gray-700 text-base">Service Provider</p>
              </div>
              <div className="flex flex-col">
                <p class="text-gray-700 text-base text-green-500">Pending</p>
                <p class="text-gray-700 text-base">29/10/2020</p>
                <p class="text-gray-700 text-base">12:00</p>
                <p class="text-gray-700 text-base">14:00</p>
                <p class="text-gray-700 text-base">Jane Doe</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly py-2">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Reschedule
          </button>
          <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Cancel
          </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError,
   user:state.auth.user
  }
}

export default connect(mapStateToProps)(Bookings);
