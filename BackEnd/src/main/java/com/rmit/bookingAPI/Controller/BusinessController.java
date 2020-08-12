package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Model.*;
import com.rmit.bookingAPI.Service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BusinessController {

    @Autowired
    BusinessService businessService;

    @PostMapping(value = "/register")
    public ResponseEntity<?> customerRegister(@RequestBody CustomerDTO customerDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null != businessService.findUserByUsername(customerDTO.getUsername())) { // a null return indicates the username is not being used
            return new ResponseEntity<String>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        businessService.addCustomer(customerDTO);
        return new ResponseEntity<CustomerDetails>(businessService.findCustomerDetailsByUsername(customerDTO.getUsername()), HttpStatus.CREATED);
    }
    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO loginDTO, BindingResult result) {
        User user = businessService.findUserByUsername(loginDTO.getUsername());
        if (null != user) {
            if (user.getPassword() == loginDTO.getPassword()) {
                return new ResponseEntity<User>(businessService.findUserByUsername(loginDTO.getUsername()), HttpStatus.OK);
            }
            return new ResponseEntity<String>("Incorrect password", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("A login with that username doesn't exist", HttpStatus.BAD_REQUEST);
    }
//    @GetMapping(value="/customers")
//    public Re


}
