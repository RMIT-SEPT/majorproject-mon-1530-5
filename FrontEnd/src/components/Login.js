import React, { Component } from "react";
import axios from "axios";

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
    axios
      .post("http://localhost:8080/api/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        this.checkCreds(false, false);
        console.log(response)
      })
      .catch((error) => {
        console.log(error.response)
        if (error.response) {
          if (error.response.data === "Incorrect password") {
            this.checkCreds(true, false);
          } else if (
            error.response.data === `A login with that username doesn't exist`
          ) {
            this.checkCreds(false, true);
          }
        }
      });
  };
  checkCreds = (passError, userError) => {
    this.setState({
      passError: passError,
      userError: userError,
    });
    if (this.state.passError === false && this.state.userError === false) {
      this.props.history.push("/profile");
    }
  };
  render() {
    const { userError, passError } = this.state;
    return (
      <div className="pt-4">
        <h1 className="text-center text-4xl ">Login</h1>
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
              {userError ? (
                <p className="text-red-500 text-xs italic">Invaid username</p>
              ) : null}
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
              {passError ? (
                <p className="text-red-500 text-xs italic">Invalid password</p>
              ) : null}
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

export default Login;
