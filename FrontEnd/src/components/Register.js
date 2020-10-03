import React, { Component } from "react";
import axios from "axios";
import { register } from "../actions/authAction";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    address: "",
    pNumber: "",
    authError: false,
  };
  handleChange = (e) => {
    if (e.target.id === "username" ) {
      axios
        .get(`http://localhost:8080/api/customer/${e.target.value}`)
        .then((response) => {
          this.checkUsername(true);
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          this.checkUsername(false);
        });
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:8080/api/register", {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        address: this.state.address,
        phoneNumber: this.state.pNumber,
      })
      .then((response) => {
        console.log(response)    
      })
      .catch((error) => {
        console.log(error);
      });
      this.props.history.push("/profile");
    
   
  };
  checkUsername = (response) => {
    this.setState({
      authError: response,
    });
  };
  
  render() {
    if(this.props.user != null)  return <Redirect to="/about"/>
    const { authError } = this.state;
    return (
      <div className="pt-4">
        <h1 className="text-center text-4xl">Register</h1>
        <form
          onSubmit={this.handleSubmit}
          className="w-full max-w-lg mx-auto py-2"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="name"
              >
                Full Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="e.g Jane Doe"
                id="name"
                onChange={this.handleChange}
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
                id="username"
                onChange={this.handleChange}
                required
              />
              {authError ? (
                <p className="text-red-500 text-xs italic">
                  Username already taken
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="**********"
                id="password"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="address"
                placeholder="Main street, Apartment 1"
                id="address"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="085243124"
                id="pNumber"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={this.state.authError}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return{
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError,
   user:state.auth.user
  }
}

export default connect(mapStateToProps)(Register);

