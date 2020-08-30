import axios from "axios"


export const getService = () =>{
    return(dispatch,getState)=>{
     axios.get('http://localhost:8080/api/service/all')
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