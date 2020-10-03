import axios from "axios"
import authHeader from '../services/authHeader';


export const getEmployees = () =>{
    return(dispatch)=>{
     axios.get('http://localhost:8080/api/employee/all',{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_EMPLOYEES', response:response.data
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

export const getIndividualEmployee = (username) =>{
    return(dispatch,getState)=>{
     axios.get(`http://localhost:8080/api/employee/get/${username}`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_EMPLOYEE', response:response.data
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

export const getAvailability = (username) =>{
    return(dispatch) =>{
        axios.get(`http://localhost:8080/api/employee/getAvailability/${username}`,{ headers: authHeader() })
        .then((response)=>{
            dispatch({
                type:'GET_AVAILABILITY', response:response.data
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


export const createEmployees = (employee) =>{
    return(dispatch,getState)=>{
     axios.post('http://localhost:8080/api/employee/add',employee,{ headers: authHeader() })
        .then(()=>{
            dispatch({
                type:'CREATE_EMPLOYEE', employee
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

