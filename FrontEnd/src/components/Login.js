import React, { Component } from "react";
import {connect} from 'react-redux'
import{ login } from "../actions/authAction"

class Login extends Component {
  state = {
    username: "",
    password: "",
    passError: false,
    userError: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username,this.state.password)
    if(this.props.isLoggedIn === true){
      this.props.history.push("/profile")
    }
  };
  
  render() {
    const { authError } = this.props
    return (
      <div className="pt-4">
        <h1 className="text-center text-4xl ">Login</h1>
        {authError ? <p className="text-red-500 text-xl text-center italic">{authError}</p> : null}
        <form
          onSubmit={this.handleSubmit}
          className="max-w-lg mx-auto px-5 py-5"
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="username"
                id="username"
              >
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                id="password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="password"
                id="password"
                value={this.state.password}
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
              >
                Login
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
    login:(username,password) => dispatch(login(username,password))
  }
  }

function mapStateToProps(state) {
  return{
   isLoggedIn:state.auth.isLoggedIn,
   authError:state.auth.authError
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);
