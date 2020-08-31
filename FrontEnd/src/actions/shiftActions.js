import axios from "axios"


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
                payload: err
            })
        })
        
    
    }
}
