import React, { Component } from "react";

export class Calendar extends Component {
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
  nextMonth = () => {
    const date = this.state.date;
    date.setMonth(date.getMonth() + 1);
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: date.toDateString(),
    });
    this.calendar();
  };
  previousMonth = () => {
    const date = this.state.date;
    date.setMonth(date.getMonth() - 1);
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: date.toDateString(),
    });
    this.calendar();
  };
  componentDidMount() {
    this.calendar();
  }
 
  calendar = () => {
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
          <td class="border px-4 py-2 bg-gray-500">
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
        nextMonthDays.push(<td class="border px-4 py-2 bg-gray-500">{i}</td>);
      }
      return nextMonthDays;
    };
   const createRows = (n) =>{
     const rows =[]
     for (let i = 1; i <= 7; i++) {
       if(7 - previousMontLastDays().length + i + n<=31){
        rows.push( <td class="border px-4 py-2 hover:bg-blue-500">
        {7 - previousMontLastDays().length + i+n}
      </td>)
       }
     }
     return rows
    };

    return (
      <div className="max-w-lg container border-2 border-blue-500">
        <div className="flex justify-evenly bg-blue-500">
          <svg
            class="fill-current text-white inline-block pr-4 w-12"
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
            <p class="text-5xl text-white">{this.state.currentMonth}</p>
            <p class="text-white mb-5">{this.state.currentDate}</p>
          </div>
          <svg
            class="fill-current text-white inline-block pl-4 w-12"
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
        <table class="table-auto ">
          <thead>
            <tr>
              <th class="px-6 py-2">Sun</th>
              <th class="px-5 py-2">Mon</th>
              <th class="px-5 py-2">Tue</th>
              <th class="px-5 py-2">Wed</th>
              <th class="px-5 py-2">Thu</th>
              <th class="px-6 py-2">Fri</th>
              <th class="px-6 py-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {previousMontLastDays()}
              {Array.from(
                Array(7 - previousMontLastDays().length),
                (_, i) => i + 1
              ).map((i) => {

                return <td class="border px-4 py-2 hover:bg-blue-500">{i}</td>;
              })}
            </tr>
            <tr>
            {createRows(0)}
            </tr>
            <tr>
            {createRows(7)}
            </tr>
            <tr>
            {createRows(14)}
            </tr>
            <tr>
            {createRows(21)}
            </tr>

          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
