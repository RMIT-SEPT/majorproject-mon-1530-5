import axios from "axios"
import authHeader from '../services/authHeader';

export const resetFeedback = () =>{
    return (dispatch)=>{
            dispatch({
                type:'RESET'
            })
        
    
    }
}
export const addBooking = (booking) => {
    return (dispatch)=>{
     axios.post('http://localhost:8080/api/booking/add',booking,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'ADD_BOOKING',response:response.data
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
