import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getOccupiedBookings, getPastBookings, cancelBooking, resetFeedback } from '../actions/bookingActions'
import { getCustomers } from '../actions/customerActions'

class Bookings extends Component {
  state = {
    selectedCustomer:""
  }
  componentDidMount() {
    this.props.getOccupiedBookings(this.props.user.username);
    this.props.getPastBookings(this.props.user.username);
    this.props.resetFeedback();
    if (this.props.user.role === "ROLE_ADMIN") {
      this.props.getCustomers();
    } else {
      this.setState({
        selectedCustomer: this.props.user.username
      })
    }
  }
  handleClick = (e) => {
    console.log(e.target.value);
    const bookingToCancel = {
      bookingId: parseInt(this.props.occBookings[e.target.value].id),
      customerUsername: this.props.occBookings[e.target.value].customerUsername
    }
    console.log(bookingToCancel);
    this.props.cancelBooking(bookingToCancel);
    setTimeout(() => this.props.getOccupiedBookings(this.state.selectedCustomer),100);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    if(e.target.id === 'selectedCustomer'){
      console.log(e.target.value)
      this.props.getOccupiedBookings(e.target.value)
    }
    this.props.resetFeedback()
  }
  render() {
    // Route guarding in case the user is not logged in or has a different role 
    if(this.props.user !== null)  {
      if(this.props.user.role !== "ROLE_CUSTOMER" && this.props.user.role !== "ROLE_ADMIN"){
        return <Redirect to="/about"/>
      } 
    }else{
      return <Redirect to="/login"/>
    }
    const {occBookings,pastBookings,customers,msgBook,msgStyle} = this.props;

    const formatEndTime = (time) => {
      return (parseInt(time.substring(0,2))+2) + time.substring(2,5);;
    }
    const editButton = () => {
      if (this.props.user.role === "ROLE_CUSTOMER") {
        return(
          <div className="text-gray-700 text-center px-8 py-5 absolute right-0">
            <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              this.props.history.push('/editDetails')}
            }
            >
            Edit Details
            </button>
          </div>
        )
      } else {
        return(
          <div className="text-gray-700 text-center px-8 py-5 absolute right-0">
            <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              this.props.history.push('/admin')}
            }
            >
            Back
            </button>
          </div>
        )
      }
    }
    const adminOptions = () => {
      if (this.props.user.role === "ROLE_ADMIN") {
        return(<div className="max-w-sm md:w-1/2 my-6 md:mb-0 mx-auto">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Choose The Employee
            </label>
            <div className="relative">
              <select
                className="bg-gray-200  appearance-none  block w-full border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="selectedCustomer"
                onChange= {this.handleChange}
              >
                 <option>Please select employee</option>
                {customers && customers.map(customer =>{
                  return(<option key={customer.id}>{customer.username}</option>)
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>)
      } else {
        return(
          <div className="text-center text-4xl">{this.state.selectedCustomer}'s Bookings</div>
        )
      }
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
          return (<div className="text-center text-2xl">No Current or Past Bookings To Show</div>)
        }
      } else {
        return (<div className="text-center text-2xl">No Current or Past Bookings To Show</div>)
      }
      return allBookings;
    }
    return (
      <div>
        {editButton()}
        <br/>
        {msgBook === "" ? null : <div className={msgStyle}>{msgBook}</div>}
        {adminOptions()}
        <div className="container mx-auto py-5 flex flew-row justify-evenly">
          {bookingHistory()}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch) =>{
  return{
    getOccupiedBookings:(username)=> dispatch(getOccupiedBookings(username)),
    getPastBookings:(username)=> dispatch(getPastBookings(username)),
    cancelBooking:(booking)=> dispatch(cancelBooking(booking)),
    resetFeedback:() =>dispatch(resetFeedback()),
    getCustomers:() =>dispatch(getCustomers())
  }
}
const mapStateToProps=(state) => {
  return{
   occBookings:state.booking.occBookings,
   pastBookings:state.booking.pastBookings,
   msgBook:state.booking.msgBook,
   msgStyle:state.booking.msgStyle,
   user:state.auth.user,
   customers:state.customer.customers
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookings);
