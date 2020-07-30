package com.rmit.myapi.Entity;

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
}
