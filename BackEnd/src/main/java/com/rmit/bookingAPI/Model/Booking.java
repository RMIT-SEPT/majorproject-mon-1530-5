package com.rmit.bookingAPI.Model;

import java.util.Date;

public class Booking {

    private int bookingId;
    private Service service;
    private Date date;
    private Customer customer;
    private Employee employee;

    public Booking(int bookingId, Service service, Date date, Customer customer, Employee employee) {
        this.bookingId = bookingId;
        this.service = service;
        this.date = date;
        this.customer = customer;
        this.employee = employee;
    }
    public int getBookingId() {
        return bookingId;
    }
    public Service getService() {
        return service;
    }
    public Date getDate() {
        return date;
    }
    public Customer getCustomer() {
        return customer;
    }
    public Employee getEmployee() {
        return employee;
    }
}
