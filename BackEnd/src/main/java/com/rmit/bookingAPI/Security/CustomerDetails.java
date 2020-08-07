package com.rmit.bookingAPI.Security;

import com.rmit.bookingAPI.Model.Admin;
import com.rmit.bookingAPI.Model.Customer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomerDetails implements UserDetails {

    private Customer customer;
    public CustomerDetails(Customer customer) {
        super();
        this.customer = customer;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("CUSTOMER"));
    }
    @Override
    public String getPassword() {
        return this.customer.getPassword();
    }
    @Override
    public String getUsername() {
        return this.customer.getUsername();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
