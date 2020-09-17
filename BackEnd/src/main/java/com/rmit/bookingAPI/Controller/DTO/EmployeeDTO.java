package com.rmit.bookingAPI.Controller.DTO;

import com.rmit.bookingAPI.Model.EmployeeDetails;
import com.rmit.bookingAPI.Model.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
        return new User(this.username, this.password, "ROLE_EMPLOYEE");
    }

    public EmployeeDetails returnEmployeeDetailsObject() {
        return new EmployeeDetails(this.username, this.name);
    }
}
