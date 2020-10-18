package com.rmit.bookingAPI.service;

import com.rmit.bookingAPI.model.Shift;
import com.rmit.bookingAPI.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Calendar;
import java.sql.Date;
import java.util.List;

/*
@author Daniel Bound
*/
@Service
public class ShiftService {

    @Autowired
    private ShiftRepository shiftRepository;

    public Shift findShiftById(Long shiftId) {

        for (Shift tempShift : getAllShifts()) {
            if (tempShift.getId().equals(shiftId)) {
                return tempShift;
            }
        }
        return null;
    }

    public List<Shift> getAllShifts() {
        List<Shift> shifts = new ArrayList<Shift>();
        shiftRepository.findAll().forEach(shifts::add);
        return shifts;
    }

    public List<Shift> getShiftsByDate(Date date) {
        List<Shift> shifts = new ArrayList<>();
        for (Shift tempShift : getAllShifts()) {
            if (tempShift.getShiftDate().compareTo(date) == 0) {
                shifts.add(tempShift);
            }
        }
        return shifts;
    }

    public List<Shift> getShiftsByUsername(String username) {
        List<Shift> shifts = new ArrayList<Shift>();
        for (Shift shift : getAllShifts()) {
            if (shift.getEmployeeUsername().equals(username)) {
                shifts.add(shift);
            }
        }
        return shifts;
    }

    public void addOrUpdateShift(Shift shift) {
        shiftRepository.save(shift);
    }

    public void removeShift(Shift shift) {
        shiftRepository.delete(shift);
    }

    //helper method to determine if shift received from Front-end is workable given the employees availability
    public boolean isShiftWorkable(Shift shift, List<DayOfWeek> availability) {

        if (availability.contains(returnDayOfWeekFromDate(shift.getShiftDate()))) {
            return true;
        }
        return false;
    }

    public DayOfWeek returnDayOfWeekFromDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        /*
         * The modulus and addition calculation inside this method is required as the Calendar object class
         * gives the days of the week starting on SUNDAY values 1-7, but the DayOfWeek enum has the first day
         * of the week as Monday, which means the values of the days of the week are off by 1 and 7 on SUNDAY
         * */
        for (DayOfWeek dayOfWeek : DayOfWeek.values()) {
            if (((dayOfWeek.getValue() % 7 ) + 1) == cal.get(Calendar.DAY_OF_WEEK)){
                return dayOfWeek;
            }
        }
        return null;
    }
}
