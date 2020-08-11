package com.rmit.bookingAPI.Service;

import com.rmit.bookingAPI.Controller.CustomerDTO;
import com.rmit.bookingAPI.Controller.EmployeeDTO;
import com.rmit.bookingAPI.Model.*;
import com.rmit.bookingAPI.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;
    @Autowired
    private PaidServiceRepository paidServiceRepository;
    @Autowired
    private ShiftRepository shiftRepository;
    @Autowired
    private BookingRepository bookingRepository;

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllAdmins() {
        List<User> users = new ArrayList<User>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    public List<EmployeeDetails> getAllEmployeeDetails() {
        List<EmployeeDetails> employeeDetails = new ArrayList<EmployeeDetails>();
        employeeDetailsRepository.findAll().forEach(employeeDetails::add);
        return employeeDetails;
    }
    public List<CustomerDetails> getAllCustomerDetails() {
        List<CustomerDetails> customerDetails = new ArrayList<CustomerDetails>();
        customerDetailsRepository.findAll().forEach(customerDetails::add);
        return customerDetails;
    }
    public List<PaidService> getAllPaidServices() {
        List<PaidService> paidServices = new ArrayList<PaidService>();
        paidServiceRepository.findAll().forEach(paidServices::add);
        return paidServices;
    }
    public List<Shift> getAllShifts() {
        List<Shift> shifts = new ArrayList<Shift>();
        shiftRepository.findAll().forEach(shifts::add);
        return shifts;
    }
    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAll().forEach(bookings::add);
        return bookings;
    }

    public void addCustomer(CustomerDTO customerDTO) {
        userRepository.save(customerDTO.getUserObject());
        customerDetailsRepository.save(customerDTO.getCustomerDetailsObject());
    }
    public void addEmployee(EmployeeDTO employeeDTO) {
        userRepository.save(employeeDTO.getUserObject());
        employeeDetailsRepository.save(employeeDTO.getEmployeeDetailsObject());
    }
    public void addPaidService(PaidService paidService) {
        paidServiceRepository.save(paidService);
    }
    public void addShift(Shift shift) {
        shiftRepository.save(shift);
    }
    public void addBooking(Booking booking) {
        bookingRepository.save(booking);
    }

}
