package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Model.*;
import com.rmit.bookingAPI.Service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BusinessController {

    @Autowired
    BusinessService businessService;

    @PostMapping(value = "/register")
    public ResponseEntity<?> customerRegister(@RequestBody CustomerDTO customerDTO) {
        businessService.addCustomer(customerDTO);
        return new ResponseEntity<CustomerDetails>(customerDTO.getCustomerDetailsObject(), HttpStatus.OK);
    }
    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO loginDTO) {
        User user = businessService.findUserByUsername(loginDTO.getUsername());
        if (null != user) {
            if (user.getPassword() == loginDTO.getPassword()) {
                return new ResponseEntity<User>(businessService.findUserByUsername(loginDTO.getUsername()), HttpStatus.OK);
            }
        }
        return new ResponseEntity<User>(businessService.findUserByUsername(loginDTO.getUsername()), HttpStatus.OK);
    }
//    @GetMapping("/")
//    public String home() {
//        return "<h1>Welcome</h1>";
//    }
//    @GetMapping("/customer")
//    public String customer() {
//        return "<h1>Welcome Customer</h1>";
//    }
//    @GetMapping("/employee")
//    public String employee() {
//        return "<h1>Welcome Employee</h1>";
//    }
//    @GetMapping("/admin")
//    public String admin() {
//        return "<h1>Welcome Admin</h1>";
//    }


}
