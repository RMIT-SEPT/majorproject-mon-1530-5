package com.rmit.myapi.Entity;

public class Customer extends User{

    private String name;
    private String address;
    private String phoneNumber;

    public Customer (String username, String password, String name, String address, String phoneNumber) {
        super.setUsername(username);
        super.setPassword(password);
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
