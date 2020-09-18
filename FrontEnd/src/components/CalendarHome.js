import React, { Component } from "react";
import {connect} from 'react-redux';
import { getService } from "../actions/servicesActions";
import axios from "axios"

export class CalendarHome extends Component {
  state = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    currentMonth: "",
    currentDate: "",
    lastDay: "",
    firstDayIndex: "",
    prevLastDay: "",
    lastDayIndex: "",
    date: new Date(),
    selectedServiceID: "",
    vacantBookings: [ ]
  };
  //Change current month to next month and the date on svg arrow-right click
  nextMonth = () => {
    const date = this.state.date;
    date.setMonth(date.getMonth() + 1);
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: date.toDateString(),
    });
    this.calendarHome();
  };
  //Change current month to previous month and the date on svg arrow-left click
  previousMonth = () => {
    const date = this.state.date;
    date.setMonth(date.getMonth() - 1);
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: date.toDateString(),
    });
    this.calendarHome();
  };
  componentDidMount() {
    //Sets up the calendar for the current month
    this.calendarHome();
    this.props.getService();
  }
  //Sets up the values for the calendar
  calendarHome = () => {
    const date = this.state.date;
    date.setDate(1);
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: new Date().toDateString(),
      lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      firstDayIndex: date.getDay(),
      prevLastDay: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      lastDayIndex: new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDay(),
    });
  };
  //When a service is selected
  handleChange = (e) => {
    this.setState({ selectedServiceID: e.target.value }, () => {
      // console.log(this.state.selectedServiceID);
    });
    if (e.target.value > 0) {
      this.getVacantBookings(e);
    } else {
      this.setState({
        vacantBookings: []
      })
    }
  }
  //Set vacant bookings to api data
  getVacantBookings = (e) => {
    axios.get(`http://localhost:8080/api/booking/vacantBookings/${e.target.value}`)
        .then((response)=>{
          this.setState({
            vacantBookings: response.data
          }, () => {
            // console.log("vacantBookings[]:", this.state.vacantBookings);
            // for (let i = 0; i < this.state.vacantBookings.length; i++) {
            //   console.log("Date and Time:", this.state.vacantBookings[i].bookingTime, 
            //   this.state.vacantBookings[i].date);
            // }
          })
        })
  }
  bookingInfo = (e) => {
    console.log(e.target.value);
    
  }
  render() {
    const {services} = this.props;
    const {vacantBookings} = this.state;
    const date = this.state.date;
    const newDate = new Date(date);
    const bookingList = vacantBookings.length ? (
      vacantBookings.map(booking => {
        return (
          <button className="border px-5 py-5" key={booking.id}>
              <p>Booking ID: {booking.id}
              <br/>Service ID: {booking.serviceId}
              <br/>Employee Name: {booking.employeeUsername}
              <br/>Date: {booking.date}
              <br/>Booking Time: {booking.bookingTime}</p><br/>
          </button>
        )
      })
    ) : (
      <div>No bookings available</div>
    )
    
    // const bookingInfo = (id) => {
    //   for (let i = 0; i < this.state.vacantBookings.length; i++) {
    //     if (this.state.vacantBookings[i].id === id) {
    //       return (
    //         <div><p>Booking ID: {vacantBookings[i].id}
    //         <br/>Service ID: {vacantBookings[i].serviceId}
    //         <br/>Employee Name: {vacantBookings[i].employeeUsername}
    //         <br/>Date: {vacantBookings[i].date}
    //         <br/>Booking Time: {vacantBookings[i].bookingTime}</p><br/></div>);
    //     }
    //   }
    //   return (<div>Select a booking</div>);
    // }
    // Create booking buttons for calendar
    const bookingButtons = (bookDate) => {
      const bookings = [];
      var year = bookDate.getFullYear(),
      month = '' + (bookDate.getMonth()+1),
      day = '' + bookDate.getDate();
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      const formattedDate = [year,month,day].join('-');
      // console.log(formattedDate);
      for (let i = 0; i < this.state.vacantBookings.length; i++) {
        if (this.state.vacantBookings[i].date === formattedDate) {
          bookings.push(<button className="border px-5 py-5" key={vacantBookings[i].id} 
          value={vacantBookings[i].id} onClick={this.bookingInfo}>
            {vacantBookings[i].bookingTime}</button>)
        }
      }
      return bookings;
    }
    const previousMonthLastDays = () => {
      const previousDays = [];
      for (let i = this.state.firstDayIndex; i > 0; i--) {
        previousDays.push(
          <td className="border px-20 py-10 bg-gray-400" key={i}>
            {this.state.prevLastDay - i + 1}
          </td>
        );
      }
      return previousDays;
    };
    const nextMonthDays = () => {
      const nextMonthDays = [];
      let nextDays = 7 - this.state.lastDayIndex - 1;
      for (let i = 1; i <= nextDays; i++) {
        nextMonthDays.push(<td className="border px-20 py-10 bg-gray-400" key={i}>{i}</td>);
      }
      return nextMonthDays;
    };
    const createFirstRow = () => {
      const rows = [];
      rows.push(previousMonthLastDays());
      for (let i = 1; i <= 7 - previousMonthLastDays().length; i++) {
        newDate.setDate(i);
        rows.push(<td className="border px-20 py-10 hover:bg-blue-500" key={i}>{i}{bookingButtons(newDate)}</td>);
      }

      return rows;
    };
    const createMiddleRows = (n) => {
      const rows = [];
      for (let i = 1; i <= 7; i++) {
        if (7 - previousMonthLastDays().length + i + n <= this.state.lastDay) {
          newDate.setDate(7 - previousMonthLastDays().length + i + n);
          rows.push(
            <td className="border px-20 py-10 hover:bg-blue-500 align-text-left" style = {{textAlign: 'right'}} key={i}>
              {7 - previousMonthLastDays().length + i + n}{bookingButtons(newDate)}
            </td>
          );
        }
      }
      return rows;
    };
    const createLastRow = () => {
      const rows = [];
      if (previousMonthLastDays().length === 5) {
        newDate.setDate(31);
        rows.push(
          <td className="border px-20 py-10 hover:bg-blue-500"key={31} >31
          {bookingButtons(newDate)}</td>,
          nextMonthDays()
        );
      } else if (previousMonthLastDays().length === 6) {
        newDate.setDate(30);
        rows.push(
          <td className="border px-20 py-10 hover:bg-blue-500" key={30}>30
          {bookingButtons(newDate)}</td>);
        newDate.setDate(31);
        rows.push(
          <td className="border px-20 py-10 hover:bg-blue-500" key={31}>31
          {bookingButtons(newDate)}</td>,
          nextMonthDays()
        );
      }

      return rows;
    };
    return (
      <div className="max-w-gl px-100 py-10 container ">
        <div className="text-center">
          <select className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
          onChange= {this.handleChange}>
          <option>Please select service</option>
               {services && services.map(service =>{
                  return( <option key={service.id} value={service.id}>{service.name}</option>)
                })}
          </select>
        <br/><br/>
        </div>
        <div className="flex px-10 py-70 justify-evenly bg-blue-800">
        {/*Left Arrow Month*/}
          <svg
            className="fill-current text-white inline-block pr-4 w-20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={this.previousMonth}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <div className="date">
            <p className="text-5xl text-white">{this.state.currentMonth}</p>
            <p className="text-white mb-5">{this.state.currentDate}</p>
          </div>
          {/*Right Arrow Month*/}
          <svg
            className="fill-current text-white inline-block pl-4 w-20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={this.nextMonth}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
        <table className="table-auto ">
          <thead>
            <tr>
              <th className="px-6 py-2">Sun</th>
              <th className="px-6 py-2">Mon</th>
              <th className="px-6 py-2">Tue</th>
              <th className="px-6 py-2">Wed</th>
              <th className="px-6 py-2">Thu</th>
              <th className="px-6 py-2">Fri</th>
              <th className="px-6 py-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>{createFirstRow()}</tr>
            <tr>{createMiddleRows(0)}</tr>
            <tr>{createMiddleRows(7)}</tr>
            <tr>{createMiddleRows(14)}</tr>
            <tr>
              {createMiddleRows(21)}
              {previousMonthLastDays().length <= 4 ? nextMonthDays() : null}
            </tr>
            <tr>{createLastRow()}</tr>
          </tbody>
        </table>
        <div className="text-center" id="bookings"><br/>{bookingList}</div>
        {/* <div className="text-center" id="bookingInfo"><br/>{bookingInfo(this.state.selectedServiceID)}</div> */}
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch) =>{
  return{
    getService:() => dispatch(getService()),
  }
}

const mapStateToProps =(state) =>{
  return{
    services:state.service.services,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarHome);
