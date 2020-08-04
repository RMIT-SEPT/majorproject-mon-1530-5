package com.rmit.bookingAPI.Service;

import com.rmit.bookingAPI.Model.*;
import com.rmit.bookingAPI.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PaidServiceRepository paidServiceRepository;
    @Autowired
    private ShiftRepository shiftRepository;
    @Autowired
    private BookingRepository bookingRepository;

    public List<Admin> getAllAdmins() {
        List<Admin> admins = new ArrayList<Admin>();
        adminRepository.findAll().forEach(admins::add);
        return admins;
    }
    public List<Employee> getAllEmployees() {
        List<Employee> employees = new ArrayList<Employee>();
        employeeRepository.findAll().forEach(employees::add);
        return employees;
    }
    public List<Customer> getAllCustomers() {
        List<Customer> customers = new ArrayList<Customer>();
        customerRepository.findAll().forEach(customers::add);
        return customers;
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
    public void addAdmin(Admin admin) {
        adminRepository.save(admin);
    }
    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }
    public void addCustomer(Customer customer) {
        customerRepository.save(customer);
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
    public Customer getCustomer(String username) {
        boolean exists = false;
        for (Customer customer : getAllCustomers() ) {
            if (customer.getUsername().equals(username)) {
                return customer;
            }
        }
        return null;
    }
}
