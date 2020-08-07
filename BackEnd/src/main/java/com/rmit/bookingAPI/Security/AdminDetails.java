package com.rmit.bookingAPI.Security;

import com.rmit.bookingAPI.Model.Admin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class AdminDetails implements UserDetails {

    private Admin admin;
    public AdminDetails(Admin admin) {
        super();
        this.admin = admin;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ADMIN"));
    }
    @Override
    public String getPassword() {
        return this.admin.getPassword();
    }
    @Override
    public String getUsername() {
        return this.admin.getUsername();
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
