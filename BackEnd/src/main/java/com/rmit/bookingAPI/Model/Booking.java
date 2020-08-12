package com.rmit.bookingAPI.Model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private Long serviceId;
    private String customerUsername;
    private String employeeUsername;

    public Booking(Date date, Long serviceId, String customerUsername, String employeeUsername) {
        this.id = id;
        this.date = date;
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
        return date;
    }
    public Long getServiceId() {
        return serviceId;
    }
    public String getCustomerUsername() {
        return customerUsername;
    }
    public String getEmployeeUsername() {
        return employeeUsername;
    }
}
