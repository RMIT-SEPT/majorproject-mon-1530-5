import axios from "axios"
import authHeader from '../services/authHeader';


export const getService = () =>{
    return(dispatch)=>{
     axios.get('http://localhost:8080/api/service/all', { headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_SERVICE',response:response.data
            })
        })
        .catch((err) =>{ 
            dispatch({
                type: "GET_ERRORS",
                payload: err
            })
        })
    }
}

export const addService = (service) => {
    return (dispatch)=>{
     axios.post('http://localhost:8080/api/service/add',service,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'ADD_SERVICE',response:response.data
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

export const resetFeedback = () =>{
    return(dispatch)=>{
            dispatch({
                type:'RESET'
            })
    }
}