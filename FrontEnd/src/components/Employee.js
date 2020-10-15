import React, { Component } from "react";
import Calendar from "./Calendar";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {getAvailability} from "../actions/employeeActions"

class Employee extends Component {
    componentDidMount() {
        this.props.getAvailability(this.props.user.username);
    }
    // set to intial values on every click action in calendar component
    changeSelectedDate = (date) =>{
        this.setState({
        selectedTime:"",
        selectedDate:date
        })
    }
    render() {
        // Route guarding in case the user is not logged in or has a different role 
        if(this.props.user !== null)  {
            if(this.props.user.role !== "ROLE_EMPLOYEE"){
            return <Redirect to="/about"/>
            } 
        }else{
            return <Redirect to="/login"/>
        }
        return (
        <div className="pt-4">
            <div className="text-gray-700 text-center px-8 py-5 absolute right-0">
                <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                this.props.history.push('/changePassword')}
                }>
                Change Password
                </button>
            </div>
            <h1 className="text-center text-4xl ">Employee Dashboard</h1>
            <div className="max-w-lg mx-auto px-100 py-10 container">
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
                <br/>
                <Calendar changeSelectedDate={this.changeSelectedDate} />
            </div>
        </div>
        );
    }
}
const mapDispatchToProps=(dispatch) =>{
    return{
      getAvailability:(username) => dispatch(getAvailability(username))
    }
  }

function mapStateToProps(state) {
    return{
        availability:state.employee.availability, 
        isLoggedIn:state.auth.isLoggedIn,
        authError:state.auth.authError,
        user:state.auth.user
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Employee);