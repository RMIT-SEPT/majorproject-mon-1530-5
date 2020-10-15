import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts';
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Admin from './components/Admin';
import AddService from './components/AddService';
import AddEmployee from './components/AddEmployee';
import AddShift from './components/AddShift';
import {Provider} from "react-redux"
import store from "./store"
import Bookings from './components/Bookings';
import Employee from './components/Employee';
import SetAvailability from './components/SetAvailability';
import EditDetails from './components/EditDetails';
import ChangePassword from './components/ChangePassword';


function App() {
  return (
    <Provider store ={store}>
    <Router>
    <div className="App">
      <Navbar/>
      <Route exact path="/" component= {Home}/>
      <Route path="/about" component= {About}/>
      <Route path="/contacts" component= {Contacts}/>
      <Route path="/login" component= {Login}/>
      <Route path="/register" component= {Register}/>
      <Route path="/admin" component= {Admin}/>
      <Route path ="/addService" component ={AddService}/>
      <Route path ="/addEmployee" component ={AddEmployee}/>
      <Route path ="/addShift" component ={AddShift}/>
      <Route path ="/setAvailability" component ={SetAvailability}/>
      <Route path ="/bookings" component ={Bookings}/>
      <Route path ="/employee" component ={Employee}/>
      <Route path ="/editDetails" component ={EditDetails}/>
      <Route path ="/changePassword" component ={ChangePassword}/>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
