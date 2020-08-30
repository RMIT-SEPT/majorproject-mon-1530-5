import React, { Component } from "react";
import Calendar from "./Calendar";
import {connect} from 'react-redux'
import {getEmployees} from "../actions/employeeActions"
import { getService } from "../actions/servicesActions";
import { addShift } from "../actions/shiftActions";

 class AddShift extends Component {
   state = {
     selectedTime:"", 
     currentDay:"",
   }

  setShift =(e) =>{ 
    this.setState({
      selectedTime:e.target.innerHTML,
    })
  }
// set to intial values on every click action in calendar component
  setIntialShiftBtns = () =>{
    this.setState({
      selectedTime:"",
      currentDay:""
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    // const newShift = {
    //   employeeUsername: this.props.getIndividualEmployee("gleb"),
    //   startDateTime:
    //   endDateTime:this.state.name
    // }

  }

  componentDidMount(){
    this.props.getService()
  }

  render() {
    const { employees,services } = this.props;
    const {selectedTime} = this.state
    const createShiftBtns = (startIndex,loopLength) =>{
      let shiftTime = ["6:30","10:30","14:30","18:30","8:30","12:30","16:30","20:30"]
      let shiftBtns = []
      for(let i = startIndex; i <= loopLength; i++){
        if(selectedTime === shiftTime[i] ){
          shiftBtns.push(
            <button class="bg-blue-500  text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={this.setShift}>
            {shiftTime[i]}
          </button>
           )
        }
        else{
          shiftBtns.push(
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={this.setShift}>
            {shiftTime[i]}
          </button>
           )
        }
      }
      return shiftBtns
    }
    return (
      <div>
        <div class="flex flex-col-reverse py-2">
          <div class="max-w-sm md:w-1/2 my-6 md:mb-0 mx-auto">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Search Employee
            </label>
            <div class="relative">
              <select
                className="bg-gray-200  appearance-none  block w-full border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="type"
              >
                {employees && employees.map(employee =>{
                  return( <option>{employee.name}</option>)
                })}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="max-w-sm md:w-1/2 my-6 md:mb-0 mx-auto">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Choose the Service
            </label>
            <div class="relative">
              <select
                className="bg-gray-200  appearance-none  block w-full border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="type"
              >
                
               {services && services.map(service =>{
                  return( <option>{service.name}</option>)
                })}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly mx-5 my-5 py-5">
        <Calendar setIntialShiftBtns={this.setIntialShiftBtns}/>

          <div className=" self-center mx-5 px-5">
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
        <div class="flex justify-center space-x-5">
          <div>
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
              type="submit"
            >
              Add Shift
            </button>
          </div>
          <div className="pl-5">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={() => {
                this.props.history.push("/profile");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch) =>{
return{
  getEmployee:()=> dispatch(getEmployees()),
  getService:() => dispatch(getService()),
  addShift:(shift) => dispatch(addShift(shift)),
  getIndividualEmployee:(username) =>dispatch(addShift(username))
}
}


const mapStateToProps =(state) =>{
  return{
    employees:state.employee.employees,
    services:state.service.services,
    selectedDay:state.shift.selectedDay,
    selectedTime:state.shift.selectedTime,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddShift);