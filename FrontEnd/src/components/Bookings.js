import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getOccupiedBookings, getPastBookings } from '../actions/bookingActions'
import { getEmployees } from "../actions/employeeActions";
import { getService } from "../actions/servicesActions"

class Bookings extends Component {
  componentDidMount() {
    this.props.getOccupiedBookings(this.props.user.username);
    this.props.getPastBookings(this.props.user.username);
    this.props.getService();
    this.props.getEmployees();
  }
  render() {
    // Route guarding in case the user is not logged in or has a different role 
    if(this.props.user !== null)  {
      if(this.props.user.role !== "ROLE_CUSTOMER"){
        return <Redirect to="/about"/>
      } 
    }else{
      return <Redirect to="/login"/>
    }
    const {occBookings,pastBookings,services,employees} = this.props;
    // Format service id to service name
    const formatService = (service) => {
      for (let i = 0; i < services.length; i++) {
        if (services[i].id === service) {
          return services[i].name;
        }
      }
    }
    // Format date to DD/MM/YYYY instead of YYYY-MM-DD
    const formatDate = (date) => {
      return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
    }
    const formatStartTime = (time) => {
      return time.substring(0,5);
    }
    const formatEndTime = (time) => {
      return (parseInt(time.substring(0,2))+2) + time.substring(2,5);;
    }
    // Format employee to show full name instead of username
    const formatEmployee = (username) => {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].username === username) {
          return employees[i].name;
        }
      }
    }
    const bookingHistory = () => {
      const allBookings = [];
      if ((occBookings !== undefined) && (pastBookings !== undefined)) {
        // Add occupied bookings to booking history
        for (let i = occBookings.length-1; i >= 0; i--) {
          allBookings.push(
          <div key={'C'+i} className="max-w-md rounded overflow-hidden shadow-xl">
          <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center py-5">{formatService(occBookings[i].serviceId)}</div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="text-gray-700 text-base">Status:</p>
                <p className="text-gray-700 text-base">Date:</p>
                <p className="text-gray-700 text-base">Start Time:</p>
                <p className="text-gray-700 text-base">End Time:</p>
                <p className="text-gray-700 text-base">Service Provider:</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-700 text-base text-green-500">Pending</p>
                <p className="text-gray-700 text-base">{formatDate(occBookings[i].date)}</p>
                <p className="text-gray-700 text-base">{formatStartTime(occBookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{formatEndTime(occBookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{formatEmployee(occBookings[i].employeeUsername)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly py-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Reschedule
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Cancel
          </button>
          </div>
        </div>)
        }
        // Add past bookings to booking history
        for (let i = 0; i < pastBookings.length; i++) {
          allBookings.push(
          <div key={'P'+i} className="max-w-md rounded overflow-hidden shadow-xl">
          <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center py-5">{formatService(pastBookings[i].serviceId)}</div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col pr-8">
                <p className="text-gray-700 text-base">Status:</p>
                <p className="text-gray-700 text-base">Date:</p>
                <p className="text-gray-700 text-base">Start Time:</p>
                <p className="text-gray-700 text-base">End Time:</p>
                <p className="text-gray-700 text-base">Service Provider:</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-700 text-base text-blue-500">Completed</p>
                <p className="text-gray-700 text-base">{formatDate(pastBookings[i].date)}</p>
                <p className="text-gray-700 text-base">{formatStartTime(pastBookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{formatEndTime(pastBookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{formatEmployee(pastBookings[i].employeeUsername)}</p>
              </div>
            </div>
          </div>
        </div>)
        }
        if (!occBookings.length && !pastBookings.length) {
          return (<div className="text-center text-4xl">No Current or Past Bookings To Show</div>)
        }
      }
      return allBookings;
    }
    return (
      <div className="container mx-auto py-5 flex flew-row justify-evenly">
        {bookingHistory()}
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch) =>{
  return{
    getOccupiedBookings:(username)=> dispatch(getOccupiedBookings(username)),
    getPastBookings:(username)=> dispatch(getPastBookings(username)),
    getService:() => dispatch(getService()),
    getEmployees:() => dispatch(getEmployees())
  }
}
const mapStateToProps=(state) => {
  return{
   occBookings:state.booking.occBookings,
   pastBookings:state.booking.pastBookings,
   services:state.service.services,
   employees:state.employee.employees,
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError,
   user:state.auth.user
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookings);
