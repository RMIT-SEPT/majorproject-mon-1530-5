package com.rmit.bookingAPI.Security;

import com.rmit.bookingAPI.Model.Admin;
import com.rmit.bookingAPI.Model.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class EmployeeDetails implements UserDetails {

    private Employee employee;
    public EmployeeDetails(Employee employee) {
        super();
        this.employee = employee;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("EMPLOYEE"));
    }
    @Override
    public String getPassword() {
        return this.employee.getPassword();
    }
    @Override
    public String getUsername() {
        return this.employee.getUsername();
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
