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
            dispatch({
                type: "LOGIN_FAIL",
              });
            dispatch({
                type: "GET_ERRORS",
                payload: error.response
            })
    })
    
  };
  
  export const register = (username, password,name,address,phoneNumber) => (dispatch) => {
    return AuthService.register(username, password,name,address,phoneNumber).then(
      (response) => {
        dispatch({
          type: "REGISTER_SUCCESS",
          response:response.data
        });
      }).catch((error) =>{
        dispatch({
            type: "REGISTER_FAIL",
          });
        dispatch({
            type: "GET_ERRORS",
            payload: error.response
        })
})
  }
  

  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: "LOGOUT",
    });
  };