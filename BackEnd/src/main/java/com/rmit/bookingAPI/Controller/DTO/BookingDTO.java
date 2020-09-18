package com.rmit.bookingAPI.Controller.DTO;

import com.rmit.bookingAPI.Model.Booking;

import javax.validation.constraints.NotBlank;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.sql.Date;

public class BookingDTO {

    @NotBlank(message = "Booking date field is required.")
    private String bookingDate;
    @NotBlank(message = "Booking time field is required.")
    private String bookingTime;
    @NotBlank(message = "Service Id field is required.")
    private String serviceId;
    @NotBlank(message = "Customer username field is required")
    private String customerUsername;
    @NotBlank(message = "Employee username field is required.")
    private String employeeUsername;

    public BookingDTO(String bookingDate, String bookingTime, String serviceId,
                      String customerUsername, String employeeUsername) {

        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.serviceId = serviceId;
        this.customerUsername = customerUsername;
        this.employeeUsername = employeeUsername;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public String getServiceId() {
        return serviceId;
    }

    public String getCustomerUsername() {
        return customerUsername;
    }

    public String getEmployeeUsername() {
        return employeeUsername;
    }

    public Long returnServiceIdAsLong() {
        try {
            return Long.parseLong(serviceId);
        }
        catch (Exception e) {
            return null;
        }
    }

    public Booking returnBookingObject() throws Exception{

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");

        Date tempBookingDate = new Date(dateFormat.parse(getBookingDate()).getTime());
        Time tempBookingTime = new Time(timeFormat.parse(getBookingTime()).getTime());

        Long serviceIdLong = Long.parseLong(serviceId);

        return new Booking(tempBookingDate, tempBookingTime, serviceIdLong, customerUsername, employeeUsername);
    }
}
