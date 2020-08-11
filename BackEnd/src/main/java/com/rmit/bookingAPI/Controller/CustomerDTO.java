package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Model.CustomerDetails;
import com.rmit.bookingAPI.Model.User;

public class CustomerDTO {

    private String username;
    private String password;
    private String name;
    private String address;
    private String phoneNumber;

    public CustomerDTO(String username, String password, String name, String address, String phoneNumber) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public User getUserObject() {
        return new User(this.username, this.password, "CUSTOMER");
    }
    public CustomerDetails getCustomerDetailsObject() {
        return new CustomerDetails(this.username, this.name, this.address, this.phoneNumber);
    }
}
