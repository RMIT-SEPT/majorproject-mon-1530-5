import React, { Component } from "react";
import { connect } from "react-redux";
import { getService } from "../actions/servicesActions";
import { addBooking, resetFeedback } from "../actions/bookingActions";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import authHeader from "../services/authHeader";
import "../css/CalendarHome.css";
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
    selectedServices: [],
    selectedServiceID: "",
    selectedBookingID: "",
    vacantBookings: [],
    customerUsername: "",
    selectedDate: "",
    selectedTime: "",
    selectedEmployee: "",
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
    this.getVacantBookings();
    this.props.resetFeedback();
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
  onSelect = (services, selected) => {
    this.state.selectedServices.push(selected);
    this.setState({
      selectedServices: this.state.selectedServices,
    });
    this.props.resetFeedback();
  };
  //When a service is removed
  onRemove = (services, removed) => {
    for (var i = 0; i < this.state.selectedServices.length; i++) {
      if (removed.id === this.state.selectedServices[i].id) {
        this.state.selectedServices.splice(i, 1);
      }
    }
    this.setState({
      selectedServices: this.state.selectedServices,
    });
    this.props.resetFeedback();
  };
  //Get vacant bookings and set vacantBookings[] to api data
  getVacantBookings = () => {
    axios
      .get(`http://localhost:8080/api/booking/vacantBookings`, {
        headers: authHeader(),
      })
      .then((response) => {
        this.setState({
          vacantBookings: response.data,
        });
      });
  };
  // When booking button is clicked
  handleClick = (e) => {
    this.setState(
      {
        selectedBookingID: e.target.value,
      },
      function () {
        var i = this.getBookingIndex();
        this.setState({
          selectedDate: this.state.vacantBookings[i].date
            .split("-")
            .reverse()
            .join("-"),
          selectedTime: this.state.vacantBookings[i].bookingTime.substring(
            0,
            5
          ),
          selectedServiceID: this.state.vacantBookings[i].serviceId,
          selectedEmployee: this.state.vacantBookings[i].employeeUsername,
        });
      }
    );
    this.props.resetFeedback();
  };
  // Get index of the booking selected on calendar in vacantBookings[]
  getBookingIndex = () => {
    for (var i = 0; i < this.state.vacantBookings.length; i++) {
      if (
        this.state.vacantBookings[i].id ===
        parseInt(this.state.selectedBookingID)
      ) {
        return i;
      }
    }
  };
  // Set customerUsername to username value
  handleUsername = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  // Create booking object and post to api
  handleSubmit = (e) => {
    e.preventDefault();
    let booking;
    if (
      this.props.user.role !== null &&
      this.props.user.role === "ROLE_CUSTOMER"
    ) {
       booking = {
        bookingDate: this.state.selectedDate,
        bookingTime: this.state.selectedTime,
        serviceId: this.state.selectedServiceID,
        customerUsername: this.props.user.username,
        employeeUsername: this.state.selectedEmployee,
      };
    }
    else if (
      this.props.user.role !== null &&
      this.props.user.role === "ROLE_ADMIN"
    ) {
     booking = {
      bookingDate: this.state.selectedDate,
      bookingTime: this.state.selectedTime,
      serviceId: this.state.selectedServiceID,
      customerUsername: this.state.customerUsername,
      employeeUsername: this.state.selectedEmployee,
    };
  }
  console.log(booking);
  this.props.addBooking(booking);
  };
  render() {
    const { services, msgBook, msgStyle } = this.props;
    const { vacantBookings, selectedServices } = this.state;
    const date = this.state.date;
    const newDate = new Date(date);
    // Create booking buttons for calendar
    const bookingButtons = (bookDate) => {
      const bookings = [];
      var year = bookDate.getFullYear(),
        month = "" + (bookDate.getMonth() + 1),
        day = "" + bookDate.getDate();
      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      const formattedDate = [year, month, day].join("-");
      for (let i = 0; i < vacantBookings.length; i++) {
        if (vacantBookings[i].date === formattedDate) {
          for (let j = 0; j < selectedServices.length; j++) {
            if (vacantBookings[i].serviceId === selectedServices[j].id)
              bookings.push(
                <button
                  className="border px-1 py-2 bg-blue-900 text-xs text-white text-left mx-1"
                  key={vacantBookings[i].id}
                  value={vacantBookings[i].id}
                  onClick={this.handleClick}
                >
                  {selectedServices[j].name}
                  <br />
                  {vacantBookings[i].bookingTime.slice(0, 5)}
                </button>
              );
          }
        }
      }
      return bookings;
    };
    // Create booking form for when a booking button is selected
    const bookingForm = () => {
      for (let i = 0; i < vacantBookings.length; i++) {
        if (vacantBookings[i].id === parseInt(this.state.selectedBookingID)) {
          if (
            this.props.user.role !== null &&
            this.props.user.role === "ROLE_CUSTOMER"
          ) {
            return (
              <div className="p-8 rounded shadow m-auto">
                <h1 className="text-center text-4xl pb-8">Book Service</h1>
                <div className="flex space-x-6 justify-center pb-8">
                  <div className="flex flex-col w-40 space-y-3 pl-4">
                    <div>Booking ID:</div>
                    <div>Service Name:</div>
                    <div>Employee Name:</div>
                    <div>Date:</div>
                    <div>Booking Time:</div>
                    <div>Username:</div>
                  </div>
                  <div className="flex flex-col w-40 space-y-3 pl-4">
                    <div>{vacantBookings[i].id}</div>
                    <div>{services[vacantBookings[i].serviceId - 1].name}</div>
                    <div>{vacantBookings[i].employeeUsername}</div>
                    <div>{vacantBookings[i].date}</div>
                    <div>{vacantBookings[i].bookingTime}</div>
                    <div>{this.props.user.username}</div>
                  </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="md:flex md:items-center justify-center">
                    <button
                      className="shadow bg-blue-900 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit">
                      Book
                    </button>
                  </div>
                </form>
              </div>
            );
          } else if (
            this.props.user.role !== null &&
            this.props.user.role === "ROLE_ADMIN"
          ) {
            return (
            <div className="p-8 rounded shadow m-auto">
              <h1 className="text-center text-4xl pb-8">Book Service</h1>
              <div className="flex space-x-6 justify-center pb-8">
                <div className="flex flex-col w-40 space-y-3 pl-4">
                  <div>Booking ID:</div>
                  <div>Service Name:</div>
                  <div>Employee Name:</div>
                  <div>Date:</div>
                  <div>Booking Time:</div>
                </div>
                <div className="flex flex-col w-40 space-y-3 pl-4">
                  <div>{vacantBookings[i].id}</div>
                  <div>{services[vacantBookings[i].serviceId - 1].name}</div>
                  <div>{vacantBookings[i].employeeUsername}</div>
                  <div>{vacantBookings[i].date}</div>
                  <div>{vacantBookings[i].bookingTime}</div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="md:flex md:items-center justify-center">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        placeholder="e.g Jane Doe"
                        id="name"
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Username
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="e.g janeDoe"
                        id="customerUsername"
                        onChange={this.handleUsername}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="md:flex md:items-center justify-center">
                  <button
                    className="shadow bg-blue-900 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Book
                  </button>
                </div>
              </form>
            </div>
            );
          }
        }
      }
    };

    const previousMonthLastDays = () => {
      const previousDays = [];
      for (let i = this.state.firstDayIndex; i > 0; i--) {
        previousDays.push(
          <td className="nextPreviousMonthDays" key={i}>
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
        nextMonthDays.push(
          <td className="nextPreviousMonthDays" key={i}>
            {i}
          </td>
        );
      }
      return nextMonthDays;
    };
    const createFirstRow = () => {
      const rows = [];
      rows.push(previousMonthLastDays());
      for (let i = 1; i <= 7 - previousMonthLastDays().length; i++) {
        newDate.setDate(i);
        rows.push(
          <td className="currentMonthDays" key={i}>
            {i}
            {bookingButtons(newDate)}
          </td>
        );
      }

      return rows;
    };
    const createMiddleRows = (n) => {
      const rows = [];
      for (let i = 1; i <= 7; i++) {
        if (7 - previousMonthLastDays().length + i + n <= this.state.lastDay) {
          newDate.setDate(7 - previousMonthLastDays().length + i + n);
          rows.push(
            <td className="currentMonthDays" key={i}>
              {7 - previousMonthLastDays().length + i + n}
              <br />
              {bookingButtons(newDate)}
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
          <td className="nextPreviousMonthDays" key={31}>
            31
            {bookingButtons(newDate)}
          </td>,
          nextMonthDays()
        );
      } else if (previousMonthLastDays().length === 6) {
        newDate.setDate(30);
        rows.push(
          <td className="nextPreviousMonthDays" key={30}>
            30
            {bookingButtons(newDate)}
          </td>
        );
        newDate.setDate(31);
        rows.push(
          <td className="nextPreviousMonthDays" key={31}>
            31
            {bookingButtons(newDate)}
          </td>,
          nextMonthDays()
        );
      }

      return rows;
    };
    return (
      <div className="px-100 py-10 container ">
        <div className="text-center max-w-4xl m-auto">
          <Multiselect
            options={services}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
            displayValue="name"
            emptyRecordMsg="No Services Available"
            placeholder="Select Services"
          />
        </div>
        <br />
        <div className="calendarHeading">
          {/*Left Arrow Month*/}
          <svg
            className="leftArrow"
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
            <p className="monthTitle">{this.state.currentMonth}</p>
            <p className="currentDateTitle">{this.state.currentDate}</p>
          </div>
          {/*Right Arrow Month*/}
          <svg
            className="rightArrow"
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
        <table className="tableMain">
          <thead>
            <tr>
              <th className="calendarDays">Sun</th>
              <th className="calendarDays">Mon</th>
              <th className="calendarDays">Tue</th>
              <th className="calendarDays">Wed</th>
              <th className="calendarDays">Thu</th>
              <th className="calendarDays">Fri</th>
              <th className="calendarDays">Sat</th>
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
        {bookingForm()}
        {msgBook === "" ? null : <div className={msgStyle}>{msgBook}</div>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getService: () => dispatch(getService()),
    addBooking: (booking) => dispatch(addBooking(booking)),
    resetFeedback: () => dispatch(resetFeedback()),
  };
};

const mapStateToProps = (state) => {
  return {
    services: state.service.services,
    msgBook: state.booking.msgBook,
    msgStyle: state.booking.msgStyle,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHome);
