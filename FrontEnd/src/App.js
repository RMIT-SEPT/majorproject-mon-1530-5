import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts';
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Profile from './components/Profile';
import AddEmployee from './components/AddEmployee';
import AddShift from './components/AddShift';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Route exact path="/" component= {Home}/>
      <Route path="/about" component= {About}/>
      <Route path="/contacts" component= {Contacts}/>
      <Route path="/login" component= {Login}/>
      <Route path="/register" component= {Register}/>
      <Route path="/profile" component= {Profile}/>
      <Route path ="/addEmployee" component ={AddEmployee}/>
      <Route path ="/addShift" component ={AddShift}/>
    </div>
    </Router>
  );
}

export default App;
