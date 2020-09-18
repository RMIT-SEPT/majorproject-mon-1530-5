import axios from "axios"


export const getEmployees = () =>{
    return(dispatch,getState)=>{
     axios.get('http://localhost:8080/api/employee/all')
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

export const getIndividualEmployee = (username) =>{
    return(dispatch,getState)=>{
     axios.get(`http://localhost:8080/api/employee/get/${username}`)
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


export const createEmployees = (employee) =>{
    return(dispatch,getState)=>{
     axios.post('http://localhost:8080/api/employee/add',employee)
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

