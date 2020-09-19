import {combineReducers} from "redux"
import bookingReducer from "./bookingReducer";
import employeeReducer from "./employeeReducer";
import serviceReducer from "./servicesReducer"
import shiftReducer from "./shiftReducer"

const rootReducer = combineReducers({
    employee: employeeReducer,
    service: serviceReducer,
    shift: shiftReducer,
    booking: bookingReducer
})
export default rootReducer;