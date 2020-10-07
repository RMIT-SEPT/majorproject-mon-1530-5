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

export const cancelBooking = (booking) => {
    return (dispatch)=>{
     axios.delete('http://localhost:8080/api/booking/cancel',booking,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'CANCEL_BOOKING',response:response.data
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

export const getOccupiedBookings = (username) =>{
    return(dispatch)=>{
     axios.get(`http://localhost:8080/api/booking/occupiedBookings/${username}`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_OCC_BOOKINGS', response:response.data
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

export const getPastBookings = (username) =>{
    return(dispatch)=>{
     axios.get(`http://localhost:8080/api/booking/pastBookings/${username}`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_PAST_BOOKINGS', response:response.data
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