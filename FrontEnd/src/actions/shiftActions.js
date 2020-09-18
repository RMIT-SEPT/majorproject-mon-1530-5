import axios from "axios"

export const getShift = () =>{
    return(dispatch,getState)=>{
     axios.get('http://localhost:8080/api/shift/all')
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
     axios.get(`http://localhost:8080/api/shift/getAvailableEmployees/${username}`)
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
     axios.get(`http://localhost:8080/api/shift/getAvailableEmployees/${date}`)
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
    return(dispatch,getState)=>{
     axios.post('http://localhost:8080/api//shift/add',shift)
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
