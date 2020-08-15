package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Model.EmployeeDetails;
import com.rmit.bookingAPI.Model.User;

import javax.validation.constraints.NotBlank;

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
    public User getUserObject() {
        return new User(this.username, this.password, "EMPLOYEE");
    }
    public EmployeeDetails getEmployeeDetailsObject() {
        return new EmployeeDetails(this.username, this.name);
    }
}
