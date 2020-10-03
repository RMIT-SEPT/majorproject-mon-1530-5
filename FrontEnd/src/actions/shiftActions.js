import axios from "axios"
import authHeader from '../services/authHeader';


export const getShift = () =>{
    return(dispatch,getState)=>{
     axios.get('http://localhost:8080/api/shift/all',  { headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_SHIFT',response:response.data
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

export const getShiftByUsername = (username) =>{
    return(dispatch,getState)=>{
     axios.get(`http://localhost:8080/api/shift/getAvailableEmployees/${username}`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_SHIFT',response:response.data
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

export const getShiftByDate = (date) =>{
    return(dispatch,getState)=>{
     axios.get(`http://localhost:8080/api/shift/getAvailableEmployees/${date}`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_SHIFT',response:response.data
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

export const resetFeedback= () =>{
    return(dispatch,getState)=>{
            dispatch({
                type:'RESET'
            })
        
    
    }
}
export const addShift= (shift) =>{
    return(dispatch)=>{
     axios.post('http://localhost:8080/api//shift/add',shift,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'ADD_SHIFT',response:response.data
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
