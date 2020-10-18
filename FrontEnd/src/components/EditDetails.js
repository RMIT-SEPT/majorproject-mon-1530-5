import React, { Component } from "react";
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {updateDetails,resetFeedback} from '../actions/customerActions';
import "../css/EditDetails.css"

class EditDetails extends Component {
    state = {
        name:"",
        address:"",
        phoneNumber:""
    }
    componentDidMount() {
        this.props.resetFeedback();
    }
    handleChange = (e) => {
        this.setState({
        [e.target.id]: e.target.value,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const details = {
            name: this.state.name,
            username: this.props.user.username,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        console.log(details);
        this.props.updateDetails(this.props.user.username, details);
    }
    render() {
        const {user,msg,msgStyle,history} = this.props;

        if(user !== null)  {
            if(user.role !== "ROLE_CUSTOMER"){
                return <Redirect to="/about"/>
            }
        }else{
            return <Redirect to="/login"/>
        }
        return(
            <div className="pt-4">
                <h1 className="text-center text-4xl ">Edit Details</h1>
                <br/>
                <div className="detailsContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="username">Username</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                defaultValue={user.username}
                                readOnly/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="name">Full Name</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text" 
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="address">Address</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text" 
                                id="address" 
                                value={this.state.address}
                                onChange={this.handleChange}
                                required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="phoneNumber">Contact Number</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                id="phoneNumber" 
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="password">Password</label>
                            </div>
                            <div className="col-75">
                                <button
                                    className="shadow bg-blue-600 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        history.push("/changePassword");
                                    }}>
                                    Click Here To Change Password
                                </button>
                            </div>
                        </div>
                        {msg === "" ? null : <div className={msgStyle}>{msg}</div>}
                        <br/>
                        <div className="row">
                            <div className="flex justify-center space-x-5">
                                <div>
                                    <button
                                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="submit">
                                    Save
                                    </button>
                                </div>
                                <div className="pl-5">
                                    <button
                                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    onClick={() => {
                                        // this.props.resetFeedback()
                                        history.push("/bookings");
                                    }}>
                                    Back
                                    </button>
                                </div>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch) =>{
    return{
      updateDetails:(username,details) =>dispatch(updateDetails(username,details)),
      resetFeedback:() =>dispatch(resetFeedback())
    }
}
const mapStateToProps=(state) =>{
    return{
        user:state.auth.user,
        msg:state.customer.msg,
        msgStyle:state.customer.msgStyle
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(EditDetails);