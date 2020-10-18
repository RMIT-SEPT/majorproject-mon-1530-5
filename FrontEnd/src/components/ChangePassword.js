import React, { Component } from "react";
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {changePassword, resetFeedback} from '../actions/customerActions';

class ChangePassword extends Component {
    state = {
        currentPassword:"",
        password:"",
        confirmPassword:"",
        match:""
    }
    componentDidMount() {
        this.props.resetFeedback();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            match: ""
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.resetFeedback();
        const { currentPassword, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            this.setState({
                match: "Passwords do not match!"
            })
        } else {
            const details = {
                oldPassword: currentPassword,
                newPassword: password,
                username: this.props.user.username
            }
            console.log(details)
            this.props.changePassword(details);
        }
    }
    redirectBack = () => {
        if (this.props.user.role === "ROLE_CUSTOMER") {
            this.props.history.push("/editDetails");
        } else if (this.props.user.role === "ROLE_ADMIN") {
            this.props.history.push("/admin");
        } else {
            this.props.history.push("/employee");
        }
    }
    render() {
        const {user,msg,msgStyle} = this.props;

        if(user === null)  {
            return <Redirect to="/login"/>
        }
        return(
            <div className="pt-4">
                <h1 className="text-center text-4xl ">Change Password</h1>
                <br/>
                <div className="detailsContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="currentPassword">Current Password</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="password" 
                                id="currentPassword"
                                value={this.state.currentPassword}
                                onChange={this.handleChange}
                                required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="password">Password</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="password" 
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label className="p-3 inline-block" htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <div className="col-75">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="password" 
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                required/>
                            </div>
                        </div>
                        {this.state.match === "" ? null : <div className="text-red-500 text-center italic">{this.state.match}</div>}
                        {msg === "" ? null : <div className={msgStyle}>{msg}</div>}
                        <br/>
                        <div className="row">
                            <div className="flex justify-center space-x-5">
                                <div>
                                    <button
                                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    Change Password
                                    </button>
                                </div>
                                <div className="pl-5">
                                    <button
                                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    onClick={this.redirectBack}>
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
      resetFeedback:() =>dispatch(resetFeedback()),
      changePassword:(details) =>dispatch(changePassword(details))
    }
}
const mapStateToProps=(state) =>{
    return{
        user:state.auth.user,
        msg:state.customer.msg,
        msgStyle:state.customer.msgStyle
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);