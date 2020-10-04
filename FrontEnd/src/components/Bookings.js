import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getOccupiedBookings } from '../actions/bookingActions'
import { getEmployees } from "../actions/employeeActions";
import { getService } from "../actions/servicesActions"

class Bookings extends Component {
  componentDidMount() {
    this.props.getOccupiedBookings(this.props.user.username);
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
    const {bookings,services,employees} = this.props;
    const formatService = (service) => {
      for (let i = 0; i < services.length; i++) {
        if (services[i].id === service) {
          return services[i].name;
        }
      }
    }
    const formatDate = (date) => {
      return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
    }
    const formatStartTime = (time) => {
      return time.substring(0,5);
    }
    const formatEndTime = (time) => {
      return (parseInt(time.substring(0,2))+2) + time.substring(2,5);;
    }
    const formatEmployee = (username) => {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].username === username) {
          return employees[i].name;
        }
      }
    }
    const bookingHistory = () => {
      const allBookings = [];
      if (bookings !== undefined) {
        for (let i = 0; i < bookings.length; i++) {
          allBookings.push(
          <div key={i} className="max-w-md rounded overflow-hidden shadow-xl">
          <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center py-5">{formatService(bookings[i].serviceId)}</div>
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
                <p className="text-gray-700 text-base">{formatDate(bookings[i].date)}</p>
                <p className="text-gray-700 text-base">{formatStartTime(bookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{formatEndTime(bookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{formatEmployee(bookings[i].employeeUsername)}</p>
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
      } else {
        return (<div className="text-center text-4xl">No Current or Past Bookings To Show</div>)
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
    getService:() => dispatch(getService()),
    getEmployees:() => dispatch(getEmployees())
  }
}
const mapStateToProps=(state) => {
  return{
   bookings:state.booking.bookings,
   services:state.service.services,
   employees:state.employee.employees,
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError,
   user:state.auth.user
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookings);
