package com.rmit.bookingAPI.Security;

import com.rmit.bookingAPI.Model.Admin;
import com.rmit.bookingAPI.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminDetailsService implements UserDetailsService {

    @Autowired
    AdminRepository adminRepository;

    public AdminDetailsService(AdminRepository adminRepository) {
        super();
        this.adminRepository = adminRepository;
        Admin admin = new Admin();
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = this.adminRepository.findByUsername(username);
        if (null == admin) {
            throw new UsernameNotFoundException("Username: " + username + " not found...");
        }
        return new AdminDetails(admin);
    }
}
