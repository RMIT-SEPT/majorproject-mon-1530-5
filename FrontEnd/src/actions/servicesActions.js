import axios from "axios"
import authHeader from '../services/authHeader';


export const getService = () =>{
    return(dispatch,getState)=>{
     axios.get('http://localhost:8080/api/service/all', { headers: authHeader() })
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