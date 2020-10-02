package com.rmit.bookingAPI.security.jwt;

import com.rmit.bookingAPI.model.RoleEnum;

import java.util.Set;

public class JWTResponsePayload {

    private String jwt;
    private String username;
    private String role;

    public JWTResponsePayload(String jwt, String username, RoleEnum role) {
        this.jwt = jwt;
        this.username = username;
        this.role = role.name();
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
