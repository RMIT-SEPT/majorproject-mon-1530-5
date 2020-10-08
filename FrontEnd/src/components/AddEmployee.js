import React, { Component } from "react";
import {connect} from 'react-redux'
import {createEmployees, resetFeedback} from "../actions/employeeActions"
import { getService } from "../actions/servicesActions";


class AddEmployee extends Component {
  state = {
    username:"",
    name: "",
    password:"",
    type:""
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit =(e) =>{
    e.preventDefault()
    const newEmployee = {
      username: this.state.username,
      password: this.state.password,
      name:this.state.name
    }
    this.props.createEmployees(newEmployee)
    this.setState({
      username:"",
      name: "",
      password:""
    })
  }


  componentDidMount(){
    this.props.getService()
  }
  render() {
    const{authError,services} = this.props
    const{name,password,username} = this.state
    return (
      <div className="pt-4">
        <h1 className="text-center text-4xl ">Add Employee</h1>
        {authError === false ? <p className="text-green-500 text-xl text-center italic">Employee was added</p> : null}
        {authError ? <p className="text-red-500 text-xl text-center italic">{authError}</p> : null}
        <form className="max-w-md mx-auto px-5 py-5" onSubmit={this.handleSubmit}>
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="username"
            >
              Username
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              id="username"
              value ={username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="name"
            >
              Name
            </label>

            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              id="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="password"
            >
              Password
            </label>

            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="type"
            >
              Type
            </label>
            <div className="relative">
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="type"
              >
                {services && services.map(service =>{
                  return( <option key={service.id}>{service.name}</option>)
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
          <div className="flex justify-center">
            <div>
              <button
                className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Create
              </button>
            </div>
            <div className="pl-5">
              <button
                className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick = {() =>{
                  this.props.resetFeedback()
                  this.props.history.push("/admin")
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
    createEmployees:(employee)=> dispatch(createEmployees(employee)),
    getService:() => dispatch(getService()),
    resetFeedback:()=>dispatch(resetFeedback())
  }
  }
  
  const mapStateToProps =(state) =>{
    return{
      employees:state.employee.employees,
      authError:state.employee.authError,
      services:state.service.services,
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AddEmployee);
