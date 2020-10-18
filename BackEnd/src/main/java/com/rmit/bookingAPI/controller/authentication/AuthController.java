package com.rmit.bookingAPI.controller.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.CustomerDTO;
import com.rmit.bookingAPI.controller.dto.EmployeeDTO;
import com.rmit.bookingAPI.controller.dto.LoginDTO;
import com.rmit.bookingAPI.security.jwt.JWTResponsePayload;
import com.rmit.bookingAPI.security.jwt.JWTUtils;
import com.rmit.bookingAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.rmit.bookingAPI.security.SecurityConstants.TOKEN_PREFIX;

/*
This controller method is responsible for the handling of authentication based requests
@author Daniel Bound
*/

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    ObjectMapper objectMapper;

    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO loginDTO, BindingResult result) throws Exception{
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generate(authentication);
            JWTResponsePayload jwtResponsePayload = new JWTResponsePayload(
                    TOKEN_PREFIX + jwt,
                    loginDTO.getUsername(),
                    userService.findUserByUsername(loginDTO.getUsername()).getRole()
            );
            return new ResponseEntity<>(jwtResponsePayload, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Incorrect username or password", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/customer/add")
    public ResponseEntity<?> addCustomer(@Valid @RequestBody CustomerDTO customerDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null != userService.findUserByUsername(customerDTO.getUsername())) { // a null return indicates the username is not being used
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(customerDTO.getPassword());
        customerDTO.setPassword(encodedPassword);
        userService.addCustomer(customerDTO);
        return new ResponseEntity<>(userService.findCustomerDetailsByUsername(customerDTO.getUsername()), HttpStatus.CREATED);
    }

    @PostMapping(value = "/employee/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addEmployee(@Valid @RequestBody EmployeeDTO employeeDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null != userService.findUserByUsername(employeeDTO.getUsername())) { // a null return indicates the username is not being used
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(employeeDTO.getPassword());
        employeeDTO.setPassword(encodedPassword);
        userService.addEmployee(employeeDTO);
        return new ResponseEntity<>(userService.findEmployeeDetailsByUsername(employeeDTO.getUsername()), HttpStatus.CREATED);
    }
}
