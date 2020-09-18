import {combineReducers} from "redux"
import employeeReducer from "./employeeReducer";
import serviceReducer from "./servicesReducer"
import shiftReducer from "./shiftReducer"

const rootReducer = combineReducers({
    employee: employeeReducer,
    service: serviceReducer,
    shift: shiftReducer
})
export default rootReducer;