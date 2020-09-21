import React, { Component } from "react";
import {connect} from 'react-redux'
import {getEmployees} from "../actions/employeeActions"
import { getService } from "../actions/servicesActions";
import { addShift } from "../actions/shiftActions";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactDOM from "react-dom";

class ServiceHome extends Component{

   state = {
     selectedEmployee:"",
     selectedService:"",
     selectedTimeSlot:""
   };

   constructor(props){
        super(props);
        this.state = {value: 'Pick an option'};
        this.handleChangeService = this.handleChangeService.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeTimeSlot = this.handleChangeTimeSlot.bind(this);
        this.handleSubmitEmployee = this.handleSubmitEmployee.bind(this);
        this.handleSubmitService = this.handleSubmitService.bind(this);
        this.handleSubmitTimeSlot = this.handleSubmitTimeSlot.bind(this);
   }

   handleChangeService(event) {
      this.setState({value: event.target.selectedService});
   }
   handleChangeEmployee(event) {
      this.setState({value: event.target.selectedEmployee});
   }

   handleChangeTimeSlot(event) {
         this.setState({value: event.target.selectedTimeSlot});
   }

   handleSubmitService(event) {
        alert("The chosen service is: " + this.selectedService.value);
        event.preventDefault();
    }

   handleSubmitEmployee(event) {
        alert("The chosen service is: " + this.selectedEmployee.value);
        event.preventDefault();
    }
       handleSubmitTimeSlot(event) {
            alert("The chosen service is: " + this.selectedTimeSlot.value);
            event.preventDefault();
        }

   render() {
        return (
        <div>
           <h1 className="text-center text-2xl ">Book Service</h1>
                <br/>
                <h1 className="text-center text-1xl "><b>Select Service</b></h1><br/>
                                <form onSubmit={this.handleSubmitService}>

                                <select className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" value = {this.state.value} onChange={this.handleChangeService}>
                                <option value = "this"> This</option>
                                <option value = "that"> That</option>
                                <option value = "those"> Those</option>
                                </select>
                                 </form>

            <br/><br/>
            <h1 className="text-center text-1xl "><b>Select Employee</b></h1><br/>
                <form onSubmit={this.handleSubmitEmployee}>

                <select className = "shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" value = {this.state.value} onChange={this.handleChangeEmployee}>
                <option value = "this"> This</option>
                <option value = "that"> That</option>
                <option value = "those"> Those</option>
                </select>
 </form>

            <br/><br/>
            <h1 className="text-center text-1xl "><b>Select Time Slot</b></h1><br/>
                <form onSubmit={this.handleSubmitEmployee}>

                <select className = "shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" value = {this.state.value} onChange={this.handleChangeEmployee}>
                <option value = "this"> This</option>
                <option value = "that"> That</option>
                <option value = "those"> Those</option>
                </select>
                            <br/><br/>
                <div className="submitButton">
                <input type = "submit" value="Submit" className="text-black-700 text-center hover:bg-blue-500 px-4 py-2 m-2 rounded-full"/> </div> </form>
        </div>
        );
   }


}
{/*// add employee, service database to drop down. Once employee is picked, add times to calender (or if not enough time, to the next drop down).*/}

export default ServiceHome;