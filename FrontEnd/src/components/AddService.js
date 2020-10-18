import React, { Component } from "react";
import {connect} from 'react-redux'
import { addService, resetFeedback } from "../actions/servicesActions";


class AddService extends Component {
  state = {
    serviceName:"",
    description:"",
  }
  componentDidMount(){
    this.props.resetFeedback()
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit =(e) =>{
    e.preventDefault()
    const newService = {
        name: this.state.serviceName,
        description: this.state.description
    }
    console.log(newService)
    this.props.addService(newService);
    this.setState({
        serviceName:"",
        description:"",
    })
  }
  render() {
    const{msg,msgStyle} = this.props
    const{serviceName,description} = this.state
    return (
      <div className="pt-4">
        <h1 className="text-center text-4xl ">Add Service</h1>
        <form className="max-w-md mx-auto px-5 py-5" onSubmit={this.handleSubmit}>
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="serviceName"
            >
              Service Name
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              id="serviceName"
              value ={serviceName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="md:flex-col mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="description"
            >
              Description
            </label>

            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              id="description"
              value={description}
              onChange={this.handleChange}
              required
            />
          </div>
            {msg === "" ? null: <p className={msgStyle}>{msg}</p>}
            <br/>
          <div className="flex justify-center">
            <div>
              <button
                className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Add Service
              </button>
            </div>
            <div className="pl-5">
              <button
                className="shadow bg-blue-900 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick = {() =>{
                  this.props.resetFeedback()
                  this.props.history.push("/admin")
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
    addService:(service) => dispatch(addService(service)),
    resetFeedback:()=>dispatch(resetFeedback())
  }
  }
  
  const mapStateToProps =(state) =>{
    return{
      msg:state.service.msg,
      msgStyle:state.service.msgStyle,
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AddService);