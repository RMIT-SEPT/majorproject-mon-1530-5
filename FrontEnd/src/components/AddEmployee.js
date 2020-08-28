import React, { Component } from "react";

class AddEmployee extends Component {
  state = {
    uesname:"",
    name: "",
    type:""
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    return (
      <div className="pt-4">
        <h1 className="text-center text-4xl ">Add Employee</h1>
        <form className="max-w-md mx-auto px-5 py-5">
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
              id="username"
            >
              Username
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              id="username"
              value={this.state.username}
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
              value={this.state.name}
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
            <div class="relative">
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="type"
                value={this.state.type}
                onChange={this.handleChange}
              >
                <option>Dentist</option>
                <option>Gym Trainer</option>
                <option>Barber</option>
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
          <div class="flex justify-center">
            <div>
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Create
              </button>
            </div>
            <div className="pl-5">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick = {() =>{
                  this.props.history.push("/profile")
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddEmployee;
