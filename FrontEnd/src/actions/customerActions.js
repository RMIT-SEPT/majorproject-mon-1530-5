import axios from "axios"
import authHeader from '../services/authHeader';

export const resetFeedback = () =>{
    return (dispatch)=>{
        dispatch({
            type:'RESET'
        })
    }
}

export const getCustomers = () =>{
    return(dispatch)=>{
     axios.get(`http://localhost:8080/api/customer/all`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_CUSTOMERS', response:response.data
            })
        })
        .catch((err) =>{ 
            dispatch({
                type: "GET_ERRORS",
                payload: err.response
            })
        })
    }
}

export const updateDetails = (username, details) =>{
    return(dispatch)=>{
     axios.put(`http://localhost:8080/api/customer/updateDetails/${username}`, details, { headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'UPDATE_DETAILS', response:response.data
            })
        })
        .catch((err) =>{ 
            dispatch({
                type: "GET_ERRORS",
                payload: err.response
            })
        })
    }
}

export const changePassword = (details) => {
    return (dispatch)=>{
      axios.put('http://localhost:8080/api/user/updatePassword',details,{ headers: authHeader() })
         .then((response)=>{
             dispatch({
                type:'CHANGE_PASSWORD',response:response.data
             })
         })
         .catch((err) =>{ 
             dispatch({
                type: "GET_ERRORS",
                payload: err.response
            })
        })
    }
}
