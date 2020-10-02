package com.rmit.bookingAPI.controller.dto;
import com.rmit.bookingAPI.model.Shift;

import javax.validation.constraints.NotBlank;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.sql.Date;

public class ShiftDTO {

    @NotBlank(message = "Employee Username field is required.")
    private String employeeUsername;
    @NotBlank(message = "Shift date field is required.")
    private String shiftDate;
    @NotBlank(message = "Start time field is required.")
    private String startTime;
    @NotBlank(message = "End time field is required.")
    private String endTime;

    public ShiftDTO(String employeeUsername, String shiftDate, String startTime, String endTime) {
        this.employeeUsername = employeeUsername;
        this.shiftDate = shiftDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getEmployeeUsername() {
        return employeeUsername;
    }

    public String getShiftDate() {
        return shiftDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public Shift returnShiftObject() throws Exception{

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");

        Date tempShiftDate = new Date(dateFormat.parse(getShiftDate()).getTime());
        Time tempStartTime = new Time(timeFormat.parse(getStartTime()).getTime());
        Time tempEndTime = new Time(timeFormat.parse(getEndTime()).getTime());

        return new Shift(employeeUsername, tempShiftDate, tempStartTime, tempEndTime);
    }
}
