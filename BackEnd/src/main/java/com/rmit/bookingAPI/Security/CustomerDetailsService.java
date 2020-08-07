package com.rmit.bookingAPI.Security;

import com.rmit.bookingAPI.Model.Customer;
import com.rmit.bookingAPI.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService implements UserDetailsService {

    @Autowired
    CustomerRepository customerRepository;

    public CustomerDetailsService(CustomerRepository customerRepository) {
        super();
        this.customerRepository = customerRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = this.customerRepository.findByUsername(username);
        if (null == customer) {
            throw new UsernameNotFoundException("Username: " + username + " not found...");
        }
        return new CustomerDetails(customer);
    }
}
