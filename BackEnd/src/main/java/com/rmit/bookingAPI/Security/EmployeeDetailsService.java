package com.rmit.bookingAPI.Security;

import com.rmit.bookingAPI.Model.Admin;
import com.rmit.bookingAPI.Model.Employee;
import com.rmit.bookingAPI.Repository.AdminRepository;
import com.rmit.bookingAPI.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDetailsService implements UserDetailsService {

    @Autowired
    EmployeeRepository employeeRepository;

    public EmployeeDetailsService(AdminRepository adminRepository) {
        super();
        this.employeeRepository = employeeRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = this.employeeRepository.findByUsername(username);
        if (null == employee) {
            throw new UsernameNotFoundException("Username: " + username + " not found...");
        }
        return new EmployeeDetails(employee);
    }
}
