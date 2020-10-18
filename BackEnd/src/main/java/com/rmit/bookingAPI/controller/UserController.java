package com.rmit.bookingAPI.controller;

import com.rmit.bookingAPI.model.CustomerDetails;
import com.rmit.bookingAPI.model.EmployeeDetails;
import com.rmit.bookingAPI.model.User;
import com.rmit.bookingAPI.service.PaidServiceService;
import com.rmit.bookingAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

/*
This controller method is responsible for the handling of all user entity requests, as well as
employeeDetails and customerDetails requests too
@author Daniel Bound
*/

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PaidServiceService paidServiceService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PutMapping(value = "/user/updatePassword")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('CUSTOMER')")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String,String> updatedDetails) {
        if (null == userService.findUserByUsername(updatedDetails.get("username"))) {
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }

        User desiredUser = userService.findUserByUsername(updatedDetails.get("username"));
        if (!bCryptPasswordEncoder.matches(updatedDetails.get("oldPassword"), desiredUser.getPassword())) {
            return new ResponseEntity<String>("Incorrect old password", HttpStatus.BAD_REQUEST);
        }

        desiredUser.setPassword(bCryptPasswordEncoder.encode(updatedDetails.get("newPassword")));
        userService.updateUser(desiredUser);
        return new ResponseEntity<String>("Password updated successfully", HttpStatus.OK);
    }

    @DeleteMapping(value = "/customer/remove/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> removeCustomer(@PathVariable("username") String username) {
        if (null == userService.findCustomerDetailsByUsername(username)) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }
        userService.removeCustomer(username);
        return new ResponseEntity<String>("Customer " + username + " removed", HttpStatus.OK);
    }

    @PutMapping(value = "/customer/updateDetails/{username}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> updateCustomerDetails(@RequestBody CustomerDetails updateDetails) {
        if (null == userService.findCustomerDetailsByUsername(updateDetails.getUsername())) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }
        CustomerDetails customerDetails = userService.findCustomerDetailsByUsername(updateDetails.getUsername());
        customerDetails.setName(updateDetails.getName());
        customerDetails.setAddress(updateDetails.getAddress());
        customerDetails.setPhoneNumber(updateDetails.getPhoneNumber());
        userService.updateCustomerDetails(customerDetails);

        return new ResponseEntity<CustomerDetails>(
                userService.findCustomerDetailsByUsername(customerDetails.getUsername()),
                HttpStatus.OK);
    }

    @GetMapping(value="/customer/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CustomerDetails>> getAllCustomers() {
        return new ResponseEntity<List<CustomerDetails>>(userService.getAllCustomerDetails(), HttpStatus.OK);
    }

    @GetMapping(value="/customer/get/{username}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<?> getCustomerByUsername(@PathVariable("username") String username) {
        if (null == userService.findCustomerDetailsByUsername(username)) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<CustomerDetails>(userService.findCustomerDetailsByUsername(username), HttpStatus.OK);
    }

    @DeleteMapping(value = "/employee/remove/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> removeEmployee(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("Employee not found", HttpStatus.NOT_FOUND);
        }
        userService.removeEmployee(username);
        return new ResponseEntity<String>("Employee " + username + " removed", HttpStatus.OK);
    }

    @GetMapping(value="/employee/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String,String>>> getAllEmployees() {
        return new ResponseEntity<List<Map<String, String>>>(userService.getAllEmployeeDetailsSimplified(), HttpStatus.OK);
    }

    @GetMapping(value="/employee/get/{username}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getEmployeeByUsername(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<EmployeeDetails>(userService.findEmployeeDetailsByUsername(username), HttpStatus.OK);
    }

    @PostMapping(value = "/employee/addService")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addServiceToEmployee(@RequestBody Map<String, String> updatedDetails) {

        String username = updatedDetails.get("username");
        Long serviceId = Long.valueOf(updatedDetails.get("serviceId"));

        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("Employee with that username does not exist", HttpStatus.NOT_FOUND);
        }
        if (null == paidServiceService.findPaidServiceById(serviceId)) {
            return new ResponseEntity<String>("Service with that serviceId does not exist", HttpStatus.NOT_FOUND);
        }
        if (userService.findEmployeeDetailsByUsername(username).getServices().contains(serviceId)) {
            return new ResponseEntity<String>("Employee already assigned to that service", HttpStatus.BAD_REQUEST);
        }
        userService.findEmployeeDetailsByUsername(username).addService(serviceId);
        userService.updateEmployeeDetails(userService.findEmployeeDetailsByUsername(username));
        return new ResponseEntity<EmployeeDetails>(userService.findEmployeeDetailsByUsername(username), HttpStatus.OK);
    }

    //Add availability to employeeDetails
    @PostMapping(value = "/employee/addAvailability")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addAvailabilityToEmployee(@RequestBody Map<String,String> updatedDetails) {

        String username = updatedDetails.get("username");

        try {
            DayOfWeek dow = DayOfWeek.valueOf(updatedDetails.get("dayOfWeek").toUpperCase());
            if (null == userService.findEmployeeDetailsByUsername(username)) {
                return new ResponseEntity<String>("Employee with that username does not exist", HttpStatus.NOT_FOUND);
            }
            if (userService.findEmployeeDetailsByUsername(username).getAvailability().contains(dow)) {
                return new ResponseEntity<String>("Employee already has that day in their availability", HttpStatus.BAD_REQUEST);
            }
            userService.findEmployeeDetailsByUsername(username).addAvailability(dow);
            userService.updateEmployeeDetails(userService.findEmployeeDetailsByUsername(username));
        } catch (Exception e) {
            return new ResponseEntity<String>("Not a valid dayOfWeek", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<EmployeeDetails>(userService.findEmployeeDetailsByUsername(username), HttpStatus.OK);
    }

    //Remove availability from employeeDetails
    @PostMapping(value = "/employee/removeAvailability")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> removeAvailabilityFromEmployee(@RequestBody Map<String, String> updatedDetails) {

        String username = updatedDetails.get("username");

        try{
            DayOfWeek dow = DayOfWeek.valueOf(updatedDetails.get("dayOfWeek").toUpperCase());

            if (null == userService.findEmployeeDetailsByUsername(username)) {
                return new ResponseEntity<String>("Employee with that username does not exist", HttpStatus.NOT_FOUND);
            }
            if (!userService.findEmployeeDetailsByUsername(username).getAvailability().contains(dow)) {
                return new ResponseEntity<String>("Employee does not have that day in their availability", HttpStatus.NOT_FOUND);
            }
            userService.findEmployeeDetailsByUsername(username).removeAvailability(dow);
            userService.updateEmployeeDetails(userService.findEmployeeDetailsByUsername(username));
        } catch (Exception e) {
            return new ResponseEntity<String>("Not a valid dayOfWeek", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<EmployeeDetails>(userService.findEmployeeDetailsByUsername(username), HttpStatus.OK);
    }

    @GetMapping(value = "/employee/getAvailability/{username}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getEmployeeAvailability(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<DayOfWeek>>(userService.findEmployeeDetailsByUsername(username).getAvailability(), HttpStatus.OK);
    }

}
