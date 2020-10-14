import AuthService from "../services/authServices";


export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data },
        });
       console.log(data)
      }
    ).catch((error) =>{
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

            dispatch({
                type: "LOGIN_FAIL",
                payload:message
              });
            dispatch({
                type: "GET_ERRORS",
                payload: message
            })
    })
    
  };
  
  export const register = (username, password,name,address,phoneNumber) => (dispatch) => {
    return AuthService.register(username, password,name,address,phoneNumber).then(
      (response) => {
        dispatch({
          type: "REGISTER_SUCCESS",
        });
      }).catch((error) =>{
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        dispatch({
            type: "REGISTER_FAIL",
            payload: message
          });
        dispatch({
            type: "GET_ERRORS",
            payload: message
        })
})
  }
  

  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: "LOGOUT",
    });
  };

  export const resetFeedback= () =>{
    return(dispatch)=>{
            dispatch({
                type:'RESET'
            })
        
    
    }
}