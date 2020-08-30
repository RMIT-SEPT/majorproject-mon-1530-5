import axios from "axios"


export const addShift= (shift) =>{
    return(dispatch,getState)=>{
     axios.post('http://localhost:8080/api//shift/add')
        .then((response)=>{
            dispatch({
                type:'GET_SERVICE',response:response.data
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

export const setShift= (date,time) =>{
    return(dispatch,getState)=>{
        dispatch()({
            type: "SET_SHIFT",
            response:[date + time]
        })
    
    }
}