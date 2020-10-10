import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getOccupiedBookings, getPastBookings, cancelBooking } from '../actions/bookingActions'

class Bookings extends Component {
  componentDidMount() {
    this.props.getOccupiedBookings(this.props.user.username);
    this.props.getPastBookings(this.props.user.username);
  }
  handleClick = (e) => {
    console.log(e.target.value);
    console.log(this.props.occBookings[e.target.value]);
    // this.props.cancelBooking(this.props.occBookings[e.target.value]);
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
    const {occBookings,pastBookings} = this.props;

    const formatEndTime = (time) => {
      return (parseInt(time.substring(0,2))+2) + time.substring(2,5);;
    }
    const bookingHistory = () => {
      const allBookings = [];
      if ((occBookings !== undefined) && (pastBookings !== undefined)) {
        // Add occupied bookings to booking history
        for (let i = 0; i < occBookings.length; i++) {
          allBookings.push(
          <div key={'C'+i} className="max-w-md rounded overflow-hidden shadow-xl">
          <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center py-5">{occBookings[i].serviceName}</div>
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
                <p className="text-gray-700 text-base">{occBookings[i].bookingDate.split('-').reverse().join('-')}</p>
                <p className="text-gray-700 text-base">{occBookings[i].bookingTime.substring(0,5)}</p>
                <p className="text-gray-700 text-base">{formatEndTime(occBookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{occBookings[i].employeeName}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-evenly py-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 ">
           Reschedule
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 my-5 " onClick={this.handleClick} value={i}>
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
          <div className="font-bold text-xl mb-2 text-center py-5">{pastBookings[i].serviceName}</div>
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
                <p className="text-gray-700 text-base">{pastBookings[i].bookingDate.split('-').reverse().join('-')}</p>
                <p className="text-gray-700 text-base">{pastBookings[i].bookingTime.substring(0,5)}</p>
                <p className="text-gray-700 text-base">{formatEndTime(pastBookings[i].bookingTime)}</p>
                <p className="text-gray-700 text-base">{pastBookings[i].employeeName}</p>
              </div>
            </div>
          </div>
        </div>)
        }
        if (!occBookings.length && !pastBookings.length) {
          return (<div className="text-center text-4xl">No Current or Past Bookings To Show</div>)
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
    getPastBookings:(username)=> dispatch(getPastBookings(username)),
    cancelBooking:(booking)=> dispatch(cancelBooking(booking))
  }
}
const mapStateToProps=(state) => {
  return{
   occBookings:state.booking.occBookings,
   pastBookings:state.booking.pastBookings,
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError,
   user:state.auth.user
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookings);
