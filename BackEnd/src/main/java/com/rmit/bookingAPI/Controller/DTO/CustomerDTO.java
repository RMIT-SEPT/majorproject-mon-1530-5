package com.rmit.bookingAPI.controller.dto;

import com.rmit.bookingAPI.model.CustomerDetails;
import com.rmit.bookingAPI.model.RoleEnum;
import com.rmit.bookingAPI.model.User;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class CustomerDTO {

    @NotBlank(message = "Username field is required.")
    private String username;
    @NotBlank(message = "Password field is required.")
    private String password;
    @NotBlank(message = "Name field is required.")
    private String name;
    @NotBlank(message = "Address field is required.")
    private String address;
    @NotBlank(message = "Phone Number field is required.")
    private String phoneNumber;

    public CustomerDTO(String username, String password, String name, String address, String phoneNumber) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public User returnUserObject() {
        return new User(this.username, this.password, RoleEnum.ROLE_CUSTOMER);
    }

    public CustomerDetails returnCustomerDetailsObject() {
        return new CustomerDetails(this.username, this.name, this.address, this.phoneNumber);
    }
}

