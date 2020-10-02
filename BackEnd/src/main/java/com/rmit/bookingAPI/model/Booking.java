package com.rmit.bookingAPI.model;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date bookingDate;
    private Time bookingTime;
    private Long serviceId;
    private String customerUsername;
    private String employeeUsername;

    public Booking(Date bookingDate, Time bookingTime, Long serviceId, String employeeUsername) {
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.serviceId = serviceId;
        this.employeeUsername = employeeUsername;
    }

    public Booking(Date bookingDate, Time bookingTime, Long serviceId, String customerUsername, String employeeUsername) {
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.serviceId = serviceId;
        this.customerUsername = customerUsername;
        this.employeeUsername = employeeUsername;
    }

    public Booking() {
    }

    public Long getId() {
        return id;
    }

    public Date getDate() {
        return bookingDate;
    }

    public Time getBookingTime() {
        return bookingTime;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
    }

    public String getEmployeeUsername() {
        return employeeUsername;
    }
}
