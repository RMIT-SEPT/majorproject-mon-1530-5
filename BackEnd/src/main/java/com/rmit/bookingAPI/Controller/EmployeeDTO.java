package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Model.EmployeeDetails;
import com.rmit.bookingAPI.Model.User;

public class EmployeeDTO {

    private String username;
    private String password;
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
