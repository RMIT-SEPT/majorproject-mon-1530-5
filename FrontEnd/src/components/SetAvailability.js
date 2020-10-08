import React, { Component } from "react";
import Calendar from "./Calendar";
import {connect} from 'react-redux'
import {addAvailability, getAvailability, removeAvailability, getEmployees, resetFeedback} from "../actions/employeeActions"

class Employee extends Component {
    state = {
        selectedEmployee: "",
        selectedDays:[],
        weekdays:["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]
      }

    componentDidMount() {
        this.props.getEmployees()
        this.props.resetFeedback()
    }
    // set to intial values on every click action in calendar component
    changeSelectedDate = (date) =>{
        this.setState({
        selectedTime:"",
        selectedDate:date
        })
    }
    handleChange = (e) =>{
        this.props.resetFeedback();
        this.setState({
          [e.target.id]: e.target.value,
        });
        if(e.target.id === 'selectedEmployee' && e.target.value !== "Please select employee"){
            console.log(e.target.value)
            this.props.getAvailability(e.target.value);
            setTimeout(() => this.setState({selectedDays: this.props.availability}), 100);
        }
    }
    handleSubmit = (e) =>{
        clearInterval(this.interval)
        e.preventDefault()
        this.props.resetFeedback();
        var time = 0;
        // Loop through each weekday
        console.log(this.props.availability)
        for (let i = 0; i < this.state.weekdays.length; i++) {
            const weekday = this.state.weekdays[i];
            const availability = {
                username: this.state.selectedEmployee,
                dayOfWeek: weekday
            }
            console.log(this.state.weekdays[i])
            // If weekday is in selected days
            if (this.state.selectedDays.includes(weekday)) {
                // Then it should be added to availability
                // If weekday is not in availability
                if (!this.props.availability.includes(weekday)) {
                    console.log("added to availability")
                    console.log(availability)
                    // Add to availability
                    setTimeout(() => 
                        this.props.addAvailability(availability), time);
                }
            } else { // Else weekday is not in selected days
                // If weekday is in availability
                if (this.props.availability.includes(weekday)) {
                    console.log("removed from availability")
                    console.log(availability)
                    // Remove from availability
                    setTimeout(() => 
                        this.props.removeAvailability(availability), time);
                }
            }
            time += 100;
        }
        this.interval = setInterval(() => 
            this.props.getAvailability(this.state.selectedEmployee), 250);
        setTimeout(() => clearInterval(this.interval), 1000);
    }
    setDays = (e) =>{
        var selDays = this.state.selectedDays;
        if (selDays.includes(e.target.innerHTML)) {
            for (let i = 0; i < selDays.length; i++) {
                if(selDays[i] === e.target.innerHTML) {
                    selDays.splice(i,1);
                }
            }
        } else {
            selDays.push(e.target.innerHTML);
        }
        this.setState({
            selectedDays: selDays
        })
        console.log(this.state.selectedDays)
    }
    render() {
        const {employees,msg,msgStyle} = this.props;
        const {selectedDays,weekdays} = this.state;
        const createDayButtons = (startIndex,loopLength) => {
            let dayButtons = [];
            for(let i = startIndex; i <= loopLength; i++){
                if(selectedDays.includes(weekdays[i])){
                    dayButtons.push(
                        <button className="bg-blue-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                        key={weekdays[i]} onClick={this.setDays}>
                        {weekdays[i]}
                        </button>
                    )
                } else {
                    dayButtons.push(
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                        key={weekdays[i]} onClick={this.setDays}>
                        {weekdays[i]}
                        </button>
                    )
                }
            }
            return dayButtons;
        }
        return (
        <div className="pt-4">
            <h1 className="text-center text-4xl ">Set Availability</h1>
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
                            return(<option key={employee.id} >{employee.username}</option>)
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
            <div className="space-y-4 container mx-auto">
                <div className="flex space-x-2">
                <button className=" border-solid border-2 border-gray-600 font-bold py-2 px-4 rounded"></button>
                <p className="text-lg"> - Available days</p>
                </div>
                <div className="flex space-x-2">
                <button className=" border-solid border-2 border-gray-600 bg-gray-400 font-bold py-2 px-4 rounded"></button>
                <p className="text-lg"> - Unavailable days</p>
                </div>
                <div className="flex space-x-2">
                <button className=" border-solid border-2 border-gray-600 bg-blue-500 font-bold py-2 px-4 rounded"></button>
                <p className="text-lg"> - Selected day/Current day</p>
                </div>
            </div>
            <div className="flex justify-evenly mx-5 my-5 py-5">
                <Calendar changeSelectedDate={this.changeSelectedDate} />
                <div className="self-center mx-5 px-5">
                    <div className=" text-center text-lg font-bold">Select Available Days</div><br/>
                    <div className="flex space-x-6">
                        <div className="flex flex-col w-40 space-y-3">
                            {createDayButtons(0,3)}
                        </div>
                        <div className="flex flex-col w-40 space-y-3">
                            {createDayButtons(4,6)}
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div className="flex justify-center space-x-5">
                    <div>
                        <button
                        className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
                        type="submit"
                        >
                        Update Availability
                        </button>
                    </div>
                    <div className="pl-5">
                        <button
                        className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        onClick={() => {
                            this.props.resetFeedback()
                            this.props.history.push("/admin");
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
        addAvailability:(availability) => dispatch(addAvailability(availability)),
        removeAvailability:(availability) => dispatch(removeAvailability(availability)),
        getAvailability:(username) => dispatch(getAvailability(username)),
        getEmployees:() =>dispatch(getEmployees()),
        resetFeedback:() =>dispatch(resetFeedback()),
    }
  }

function mapStateToProps(state) {
    return{
        availability:state.employee.availability, 
        employees:state.employee.employees,
        msg:state.employee.msg,
        msgStyle:state.employee.msgStyle
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Employee);