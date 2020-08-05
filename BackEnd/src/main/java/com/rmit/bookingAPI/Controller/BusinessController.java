package com.rmit.bookingAPI.Controller;

import ch.qos.logback.core.CoreConstants;
import ch.qos.logback.core.net.SyslogOutputStream;
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
    public ResponseEntity<?> customerRegister(@RequestBody Customer customer) {
        businessService.addCustomer(customer);
        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }
    @PostMapping(value = "/login")
    public ResponseEntity<?> customerLogin(@RequestParam("username") String username, @RequestParam("password") String password) {
        System.out.println(username + "here!");
        Customer tempCustomer = businessService.getCustomer(username);
        if (tempCustomer.getPassword().equals(password)) {
            return new ResponseEntity<Customer>(tempCustomer, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Invalid Login Credentials", HttpStatus.BAD_REQUEST);
        }
    }


}
