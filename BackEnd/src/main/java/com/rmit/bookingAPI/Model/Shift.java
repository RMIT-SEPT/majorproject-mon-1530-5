package com.rmit.bookingAPI.Model;

import java.util.Date;

public class Shift {

    private Employee employee;
    private Date date;

    public Shift(Employee employee, Date date) {
        this.employee = employee;
        this.date = date;
    }
    public Employee getEmployee() {
        return employee;
    }
    public Date getDate() {
        return date;
    }
}
