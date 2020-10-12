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