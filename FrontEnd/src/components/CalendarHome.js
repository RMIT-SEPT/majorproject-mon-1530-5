import React, { Component } from "react";

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
  };
  //Change current month to next month and the date on svg arrow-right click
  nextMonth = () => {
    const date = this.state.date;
    date.setMonth(date.getMonth() + 1);
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: date.toDateString(),
    });
    this.calendar();
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

  render() {
    const previousMontLastDays = () => {
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
      rows.push(previousMontLastDays());
      for (let i = 1; i <= 7 - previousMontLastDays().length; i++) {
        rows.push(<td className="border px-20 py-10 hover:bg-blue-400" key={i}>{i}</td>);
      }

      return rows;
    };
    const createMiddleRows = (n) => {
      const rows = [];
      for (let i = 1; i <= 7; i++) {
        if (7 - previousMontLastDays().length + i + n <= this.state.lastDay) {
          rows.push(
            <td className="border px-20 py-10 hover:bg-blue-500 align-text-left" style = {{textAlign: 'right'}} key={i}>
              {7 - previousMontLastDays().length + i + n}
            </td>
          );
        }
      }
      return rows;
    };
    const createLastRow = () => {
      const rows = [];
      if (previousMontLastDays().length === 5) {
        rows.push(
          <td className="border px-20 py-10 hover:bg-blue-500" key={31} >31</td>,
          <td className="border px-20 py-10 hover:bg-blue-500"key={31} >31</td>,
          nextMonthDays()
        );
      } else if (previousMontLastDays().length === 6) {
        rows.push(
          <td className="border px-20 py-10 hover:bg-blue-500" key={30}>30</td>,
          <td className="border px-20 py-10 hover:bg-blue-500" key={31}>31</td>,
          nextMonthDays()
        );
      }

      return rows;
    };

    return (
      <div className="max-w-gl px-100 py-10 container ">
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
        <table className="table-auto  ">
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
              {previousMontLastDays().length <= 4 ? nextMonthDays() : null}
            </tr>
            <tr>{createLastRow()}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CalendarHome;
