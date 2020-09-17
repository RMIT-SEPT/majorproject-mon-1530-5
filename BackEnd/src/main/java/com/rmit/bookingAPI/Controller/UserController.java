package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Controller.DTO.CustomerDTO;
import com.rmit.bookingAPI.Controller.DTO.EmployeeDTO;
import com.rmit.bookingAPI.Controller.DTO.LoginDTO;
import com.rmit.bookingAPI.Model.CustomerDetails;
import com.rmit.bookingAPI.Model.EmployeeDetails;
import com.rmit.bookingAPI.Model.User;
import com.rmit.bookingAPI.Service.PaidServiceService;
import com.rmit.bookingAPI.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.DayOfWeek;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PaidServiceService paidServiceService;


    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO loginDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        User user = userService.findUserByUsername(loginDTO.getUsername());
        if (null != user) {
            if (user.getPassword().equals(loginDTO.getPassword())) {

                Map<String,String> userSimplified = new HashMap<>();
                userSimplified.put("username", user.getUsername());
                userSimplified.put("authGroup", user.getAuthGroup());
                return new ResponseEntity<Map<String,String>>(userSimplified, HttpStatus.OK);
            }
            return new ResponseEntity<String>("Incorrect password", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("A login with that username doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/user/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String,String> updatedDetails) {
        if (null == userService.findUserByUsername(updatedDetails.get("username"))) {
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }

        User desiredUser = userService.findUserByUsername(updatedDetails.get("username"));
        if (!desiredUser.getPassword().equals(updatedDetails.get("oldPassword"))) {
            return new ResponseEntity<String>("Incorrect old password", HttpStatus.BAD_REQUEST);
        }

        desiredUser.setPassword(updatedDetails.get("newPassword"));
        userService.updateUser(desiredUser);
        return new ResponseEntity<String>("Password updated successfully", HttpStatus.OK);
    }

    @PostMapping(value = "/customer/add")
    public ResponseEntity<?> addCustomer(@Valid @RequestBody CustomerDTO customerDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null != userService.findUserByUsername(customerDTO.getUsername())) { // a null return indicates the username is not being used
            return new ResponseEntity<String>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        userService.addCustomer(customerDTO);
        return new ResponseEntity<CustomerDetails>(userService.findCustomerDetailsByUsername(customerDTO.getUsername()), HttpStatus.CREATED);
    }

    @PutMapping(value = "/customer/updateDetails/{username}")
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
    public ResponseEntity<List<CustomerDetails>> getAllCustomers() {
        return new ResponseEntity<List<CustomerDetails>>(userService.getAllCustomerDetails(), HttpStatus.OK);
    }

    @GetMapping(value="/customer/get/{username}")
    public ResponseEntity<?> getCustomerByUsername(@PathVariable("username") String username) {
        if (null == userService.findCustomerDetailsByUsername(username)) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<CustomerDetails>(userService.findCustomerDetailsByUsername(username), HttpStatus.OK);
    }

    @PostMapping(value = "/employee/add")
    public ResponseEntity<?> addEmployee(@Valid @RequestBody EmployeeDTO employeeDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null != userService.findUserByUsername(employeeDTO.getUsername())) { // a null return indicates the username is not being used
            return new ResponseEntity<String>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        userService.addEmployee(employeeDTO);
        return new ResponseEntity<EmployeeDetails>(userService.findEmployeeDetailsByUsername(employeeDTO.getUsername()), HttpStatus.CREATED);
    }

    @GetMapping(value="/employee/all")
    public ResponseEntity<List<Map<String,String>>> getAllEmployees() {
        return new ResponseEntity<List<Map<String, String>>>(userService.getAllEmployeeDetailsSimplified(), HttpStatus.OK);
    }

    @GetMapping(value="/employee/get/{username}")
    public ResponseEntity<?> getEmployeeByUsername(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<EmployeeDetails>(userService.findEmployeeDetailsByUsername(username), HttpStatus.OK);
    }

    @PostMapping(value = "/employee/addService")
    public ResponseEntity<?> addServiceToEmployee(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        Long serviceId = Long.valueOf(body.get("serviceId"));

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
    public ResponseEntity<?> getEmployeeAvailability(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<DayOfWeek>>(userService.findEmployeeDetailsByUsername(username).getAvailability(), HttpStatus.OK);
    }

}
