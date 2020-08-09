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
