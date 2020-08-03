package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Model.*;
import com.rmit.bookingAPI.Service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BusinessController {

    @Autowired
    BusinessService businessService;

    @PostMapping(value = "/login")
    public ResponseEntity<Customer> customerLogin(@RequestParam("username") String username, @RequestParam("password") String password) {
        Customer tempCustomer = businessService.getCustomer(username);
        if (tempCustomer.getPassword().equals(password)) {
            return tempCustomer;
        }
    }
}
