import React, { Component } from "react";
import Calendar from "./Calendar";
import {connect} from 'react-redux'
import {getAvailability, getEmployees} from "../actions/employeeActions"
import { addShift, resetFeedback } from "../actions/shiftActions";
import '../css/SetAvailabilityShift.css';

 class AddShift extends Component {
   state = {
     selectedTime:"", 
     selectedDate:"",
     selectedEmployee:"",
   }
   
  setShift =(e) =>{ 
    this.setState({
      selectedTime:e.target.innerHTML,
      startDateTime:this.state.selectedDate
    })
  }
// set to intial values on every click action in calendar component
  changeSelectedDate = (date) =>{
    this.setState({
      selectedTime:"",
      selectedDate:date
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const newShift = {
      employeeUsername: this.state.selectedEmployee,
      shiftDate:this.state.selectedDate,
      startTime:this.state.selectedTime,
      endTime:this.state.selectedTime
    }
    this.props.addShift(newShift)
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value,
    });
    if(e.target.id === 'selectedEmployee'){
      console.log(e.target.value)
      this.props.getAvailability(e.target.value)
    }
  }

  componentDidMount(){
    this.props.getEmployees()
  }

  render() {
    const {employees,msg,msgStyle} = this.props;
    const {selectedTime} = this.state
    const createShiftBtns = (startIndex,loopLength) =>{
      let shiftTime = ["6:30","10:30","14:30","18:30","8:30","12:30","16:30","20:30"]
      let shiftBtns = []
      for(let i = startIndex; i <= loopLength; i++){
        if(selectedTime === shiftTime[i] ){
          shiftBtns.push(
            <button className="bg-blue-500  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" key={i} onClick={this.setShift}>
            {shiftTime[i]}
          </button>
           )
        }
        else{
          shiftBtns.push(
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"  key={i} onClick={this.setShift}>
            {shiftTime[i]}
          </button>
           )
        }
      }
      return shiftBtns
    }
    return (
      <div className="pt-4 w-screen">
        <h1 className="text-center text-4xl ">Add Shift</h1>
        <div className="flex flex-col-reverse py-2">
          <div className="max-w-sm md:w-1/2 my-6 md:mb-0 mx-auto">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Choose The Employee
            </label>
            <div className="relative">
              <select
                className="bg-gray-200  appearance-none  block w-full border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="selectedEmployee"
                onChange= {this.handleChange}
              >
                 <option>Please select employee</option>
                {employees && employees.map(employee =>{
                  return(<option key={employee.id}>{employee.username}</option>)
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
          </div>
        </div>
         {msg === "" ? null: <p className={msgStyle}>{msg}</p>}

         <div className="daysIndexContainer">
           <div className="flex space-x-2 py-1">
           <button className=" border-solid border-2 border-gray-600 font-bold py-2 px-4 rounded"></button>
            <p className="text-lg "> - Available days</p>
           </div>
           <div className="flex space-x-2 py-1">
           <button className=" border-solid border-2 border-gray-600 bg-gray-400 font-bold py-2 px-4 rounded"></button>
           <p className="text-lg"> - Unavailable days</p>
           </div>
           <div className="flex space-x-2 py-1">
           <button className=" border-solid border-2 border-gray-600 bg-blue-500 font-bold py-2 px-4 rounded"></button>
           <p className="text-lg"> - Selected day/Current day</p>
           </div>
         </div>
        <div className="calendarContainer">
          <Calendar changeSelectedDate={this.changeSelectedDate} /></div>
          <div className="timeIndexContainer">
          <div className="self-center mx-5 px-5">
            <div className="flex space-x-6">
              <div className="flex flex-col w-40 space-y-3">
              {createShiftBtns(0,3)}
              </div>
              <div className="flex flex-col space-y-3 w-40">
              {createShiftBtns(4,7)}
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
      
        <div className="enterButtonsContainer">
          <div className="float-left">
            <button
              className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Shift
            </button>
          </div>
          <div className="pl-5 float-left">
            <button
              className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={() => {
                this.props.resetFeedback()
                this.props.history.push("/admin");
                // Will remove the msg but reloads the page, which is not good UX
                // window.location.reload(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch) =>{
  return{
    getEmployees:()=> dispatch(getEmployees()),
    addShift:(shift) => dispatch(addShift(shift)),
    resetFeedback:() =>dispatch(resetFeedback()),
    getAvailability:(username) => dispatch(getAvailability(username))
  }
}


const mapStateToProps =(state) =>{
  return{
    employees:state.employee.employees,
    msg:state.shift.msg,
    msgStyle:state.shift.msgStyle
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddShift);