package com.rmit.bookingAPI.Service;

import com.rmit.bookingAPI.Controller.DTO.*;
import com.rmit.bookingAPI.Model.CustomerDetails;
import com.rmit.bookingAPI.Model.EmployeeDetails;
import com.rmit.bookingAPI.Model.User;
import com.rmit.bookingAPI.Repository.CustomerDetailsRepository;
import com.rmit.bookingAPI.Repository.EmployeeDetailsRepository;
import com.rmit.bookingAPI.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;


    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public EmployeeDetails findEmployeeDetailsByUsername(String username) {
        return employeeDetailsRepository.findByUsername(username);
    }

    public CustomerDetails findCustomerDetailsByUsername(String username) {
        return customerDetailsRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<User>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public List<EmployeeDetails> getAllEmployeeDetails() {
        List<EmployeeDetails> employeeDetails = new ArrayList<EmployeeDetails>();
        employeeDetailsRepository.findAll().forEach(employeeDetails::add);
        return employeeDetails;
    }

    public List<Map<String,String>> getAllEmployeeDetailsSimplified() {
        List<EmployeeDetails> employeeDetailsList = new ArrayList<EmployeeDetails>();
        employeeDetailsRepository.findAll().forEach(employeeDetailsList::add);

        List<Map<String,String>> tempDetailsList = new ArrayList<>();
        for (EmployeeDetails employeeDetails : employeeDetailsList) {

            Map<String,String> tempDetails = new HashMap<>();
            tempDetails.put("id", employeeDetails.getId().toString());
            tempDetails.put("username", employeeDetails.getUsername());
            tempDetails.put("name", employeeDetails.getName());

            tempDetailsList.add(tempDetails);
        }

        return tempDetailsList;
    }

    public List<DayOfWeek> getEmployeeAvailability(String username) {
        if (null == employeeDetailsRepository.findByUsername(username)) {
            return null;
        }
        return employeeDetailsRepository.findByUsername(username).getAvailability();
    }

    public List<Long> getEmployeeServices(String username) {
        if (null == employeeDetailsRepository.findByUsername(username)) {
            return null;
        }
        return employeeDetailsRepository.findByUsername(username).getServices();
    }

    public List<CustomerDetails> getAllCustomerDetails() {
        List<CustomerDetails> customerDetails = new ArrayList<CustomerDetails>();
        customerDetailsRepository.findAll().forEach(customerDetails::add);
        return customerDetails;
    }

    public void addCustomer(CustomerDTO customerDTO) {
        userRepository.save(customerDTO.returnUserObject());
        customerDetailsRepository.save(customerDTO.returnCustomerDetailsObject());
    }

    public void addEmployee(EmployeeDTO employeeDTO) {
        userRepository.save(employeeDTO.returnUserObject());
        employeeDetailsRepository.save(employeeDTO.returnEmployeeDetailsObject());
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void updateCustomerDetails(CustomerDetails customerDetails) {
        customerDetailsRepository.save(customerDetails);
    }

    public void updateEmployeeDetails(EmployeeDetails employeeDetails) {
        employeeDetailsRepository.save(employeeDetails);
    }

    public void removeCustomer(String username) {
        userRepository.delete(userRepository.findByUsername(username));
        customerDetailsRepository.delete(customerDetailsRepository.findByUsername(username));
    }

    public void removeEmployee(String username) {
        userRepository.delete(userRepository.findByUsername(username));
        employeeDetailsRepository.delete(employeeDetailsRepository.findByUsername(username));
    }
}
