import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class Employee extends Component {
    render() {
        // Route guarding in case the user is not logged in or has a different role 
        if(this.props.user !== null)  {
            if(this.props.user.role !== "ROLE_EMPLOYEE"){
            return <Redirect to="/about"/>
            } 
        }else{
            return <Redirect to="/login"/>
        }
        return null;
    }
}

function mapStateToProps(state) {
    return{
     isLoggedIn:state.auth.isLoggedIn,
     authError:state.auth.authError,
     user:state.auth.user
    }
  }
  
export default connect(mapStateToProps)(Employee);