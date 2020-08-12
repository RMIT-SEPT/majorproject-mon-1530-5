package com.rmit.bookingAPI.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String employeeUsername;
    private Date date;

    public Shift(String employeeId, Date date) {
        this.employeeUsername = employeeId;
        this.date = date;
    }
    public Shift() {
    }
    public Long getId() {
        return id;
    }
    public String getEmployeeUsername() {
        return employeeUsername;
    }
    public void setEmployeeUsername(String employeeUsername) {
        this.employeeUsername = employeeUsername;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
}
