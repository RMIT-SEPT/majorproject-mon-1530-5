package com.rmit.bookingAPI.controller.dto;

import com.rmit.bookingAPI.model.EmployeeDetails;
import com.rmit.bookingAPI.model.RoleEnum;
import com.rmit.bookingAPI.model.User;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class EmployeeDTO {

    @NotBlank(message = "Username field is required.")
    private String username;
    @NotBlank(message = "Password field is required.")
    private String password;
    @NotBlank(message = "Name field is required.")
    private String name;

    public EmployeeDTO(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public User returnUserObject() {
        return new User(this.username, this.password, RoleEnum.ROLE_EMPLOYEE);
    }

    public EmployeeDetails returnEmployeeDetailsObject() {
        return new EmployeeDetails(this.username, this.name);
    }
}
