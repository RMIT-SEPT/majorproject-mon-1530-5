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
    date: new Date(), // date object that contains all date related functions
    selectedDay:new Date().getDate()
  };

  //Sets up the values for the calendar
  calendar = () => {
    const date = this.state.date;

    const currentDate = new Date()
    currentDate.setFullYear(this.state.date.getFullYear())
    // Setting the current day of the month to first day on the date object
    // This is done to find out the day of the week this day corresponds too

    date.setDate(1); 
    this.setState({
      currentMonth: this.state.months[date.getMonth()], // Current month on the calendar
      currentDate: currentDate.toDateString(), // String that contains (day of the week ,day of the month ,year)
      lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),  // Last day of the currently selected month
      // Index of the first day of the month Sun = 0, Mon = 1 and so on
      firstDayIndex: date.getDay(),
      //Last day(31,30..) of the previous month
      prevLastDay: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      // Index of the last day of the the month Sun = 0, Mon = 1 and so on
      lastDayIndex: new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDay(), 
    });
  }

  componentDidMount() {
    //Sets up the calendar for the current month
    this.calendar();
  }


  //Change current month to next month
  nextMonth = () => {
    const date = this.state.date;
    if(date.getMonth() === 11){
      date.setMonth(date.getMonth() + 1); //adding 1 to the index of the current month and setting the result
      date.setFullYear(date.getFullYear())
      console.log(date.getFullYear())
      this.setState({
        currentMonth: this.state.months[date.getMonth()],
        currentDate: date.toDateString(),
      });
    }
    else{
      date.setMonth(date.getMonth() + 1); //adding 1 to the index of the current month and setting the result
      this.setState({
        currentMonth: this.state.months[date.getMonth()],
        currentDate: date.toDateString(),
      });
    }
   
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
    this.calendar();
  };

  // sets the day that the user clicked as the current day 
  setDay = (e)=>{
   const date = this.state.date
   date.setDate(e.target.innerHTML)
    this.setState({
      selectedDay: date.getDate()
    })
    this.props.setIntialShiftBtns()
    this.calendar()
  }

  render() {
    const {lastDay,firstDayIndex,prevLastDay,lastDayIndex,selectedDay} = this.state

    const previousMontLastDays = () => {
      const previousDays = [];
      // loop starts from the index which corresponds 
      //to the day of the week of the first day (0..6)
      for (let i = firstDayIndex; i > 0; i--) {
        previousDays.push(
          // inserts the jsx into the array
          // prevLastDay = Last day(31,30..) of the previous month
          <td className="border px-4 py-2 bg-gray-500" key={i}>
            {prevLastDay - i + 1}
          </td>
        );
      }
      return previousDays;
    };
    const nextMonthDays = () => {
      const nextMonthDays = [];
      // the number of the left over days 
      // of the next month on the calendar
      let nextDays = 7 - lastDayIndex - 1; 
      for (let i = 1; i <= nextDays; i++) {
        nextMonthDays.push(<td className="border px-4 py-2 bg-gray-500" key={i}>{i}</td>);
      }
      return nextMonthDays;
    };

    // Creats a first row of the calendar 
    const createFirstRow = () => {
      const rows = [];
      // previousMontLastDays().length = returns the number of the left over last days of the previous month
      rows.push(previousMontLastDays());
      for (let i = 1; i <= 7 - previousMontLastDays().length; i++) {
        rows.push(<td className="border px-4 py-2 hover:bg-blue-500" key={i}>{i}</td>);
      }

      return rows;
    };
   // Creats a middle rows of the calendar 
    const createMiddleRows = (n) => {
      const rows = [];
      for (let i = 1; i <= 7; i++) {
        if (7 - previousMontLastDays().length + i + n <= lastDay) {
          if(selectedDay === 7 - previousMontLastDays().length + i + n){
            rows.push(
              <td className="border px-4 py-2 bg-blue-500" key={i}>
                {7 - previousMontLastDays().length + i + n}
              </td>
            );
          }
          else{
            rows.push(
              <td className="border px-4 py-2 hover:bg-blue-500" onClick={this.setDay} key={i}>
                {7 - previousMontLastDays().length + i + n}
              </td>
            );
          }
          
        }
      }
      return rows;
    };

    //Creates last row of the calendar
    const createLastRow = () => {
      const rows = [];
      if (previousMontLastDays().length === 5) {
        rows.push(
          <td className="border px-4 py-2 hover:bg-blue-500"key={31} >31</td>,
          nextMonthDays()
        );
      } else if (previousMontLastDays().length === 6) {
        rows.push(
          <td className="border px-4 py-2 hover:bg-blue-500" key={30}>30</td>,
          <td className="border px-4 py-2 hover:bg-blue-500" key={31}>31</td>,
          nextMonthDays()
        );
      }

      return rows;
    };

    return (
      <div className="max-w-lg container border-2 border-blue-500">
        <div className="flex justify-evenly bg-blue-500">
          <svg
            className="fill-current text-white inline-block pr-4 w-12"
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
          <svg
            className="fill-current text-white inline-block pl-4 w-12"
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
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-6 py-2">Sun</th>
              <th className="px-5 py-2">Mon</th>
              <th className="px-5 py-2">Tue</th>
              <th className="px-5 py-2">Wed</th>
              <th className="px-5 py-2">Thu</th>
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

export default Calendar;
