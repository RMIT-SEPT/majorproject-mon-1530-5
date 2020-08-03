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
    private Long customerId;
    private Long employeeId;

    public Booking(Date date, Long serviceId, Long customerId, Long employeeId) {
        this.id = id;
        this.date = date;
        this.serviceId = serviceId;
        this.customerId = customerId;
        this.employeeId = employeeId;
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
    public Long getCustomerId() {
        return customerId;
    }
    public Long getEmployeeId() {
        return employeeId;
    }
}
