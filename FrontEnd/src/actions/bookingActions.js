import axios from "axios"

export const resetFeedback= () =>{
    return(dispatch,getState)=>{
            dispatch({
                type:'RESET'
            })
        
    
    }
}
export const addBooking = (booking) =>{
    return(dispatch,getState)=>{
     axios.post('http://localhost:8080/api/booking/add',booking)
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
