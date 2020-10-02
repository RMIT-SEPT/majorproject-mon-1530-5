package com.rmit.bookingAPI.controller;

import com.rmit.bookingAPI.controller.dto.ShiftDTO;
import com.rmit.bookingAPI.model.Booking;
import com.rmit.bookingAPI.model.EmployeeDetails;
import com.rmit.bookingAPI.model.Shift;
import com.rmit.bookingAPI.service.BookingService;
import com.rmit.bookingAPI.service.ShiftService;
import com.rmit.bookingAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class ShiftController {

    @Autowired
    ShiftService shiftService;

    @Autowired
    UserService userService;

    @Autowired
    BookingService bookingService;


    @PostMapping(value = "/shift/add")
    public ResponseEntity<String> addShift(@Valid @RequestBody ShiftDTO shiftDTO, BindingResult result) throws Exception{
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }

        Calendar tempCal = Calendar.getInstance();
        try {
            //Shift object constructed from the DTO received
            Shift newShift = shiftDTO.returnShiftObject();

            if (newShift.getShiftDate().before(tempCal.getTime())) {
                return new ResponseEntity<String>("Cannot add a shift before today's date", HttpStatus.BAD_REQUEST);
            }

            //shift cannot be added further than 1 month in the future
            tempCal.add(Calendar.MONTH, 1);
            if (newShift.getShiftDate().after(tempCal.getTime())) {
                return new ResponseEntity<String>("Cannot add shift further than 1 month in the future", HttpStatus.BAD_REQUEST);
            }
            if (null == userService.findEmployeeDetailsByUsername(newShift.getEmployeeUsername())) {
                return new ResponseEntity<String>("That employee does not exist", HttpStatus.NOT_FOUND);
            }
            for (Shift tempShift : shiftService.getAllShifts()) {
                if (tempShift.getEmployeeUsername().equals(newShift.getEmployeeUsername())) {
                    if (tempShift.getShiftDate().compareTo(newShift.getShiftDate()) == 0) {
                        return new ResponseEntity<String>("That shift already exists", HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (!shiftService.isShiftWorkable(newShift, userService.getEmployeeAvailability(newShift.getEmployeeUsername()))) {
                return new ResponseEntity<String>("Shift is outside of employee availability", HttpStatus.BAD_REQUEST);
            }
            shiftService.addOrUpdateShift(newShift);

            /*
             * When the shift gets successfully added, the consequent vacant bookings are added for the services that the
             * employee can provide. For example, if the employee can provide 3 different services, then 3 vacant bookings
             * are added to the system for a customer to book. Once one of those bookings is booked, the other vacant
             * bookings are removed as the employee can no longer provide them as they now have the newly booked service to
             * provide.
             *
             * This section will need to be modified if shifts become longer than 2 hours (the same length as 1 booking).
             * */
            EmployeeDetails tempEmployee = userService.findEmployeeDetailsByUsername(newShift.getEmployeeUsername());
            for (Long serviceId : tempEmployee.getServices()) {
                bookingService.addOrUpdateBooking(
                        new Booking(
                                newShift.getShiftDate(),
                                newShift.getStartTime(),
                                serviceId,
                                newShift.getEmployeeUsername()
                        )
                );
            }
            return new ResponseEntity<String>("Shift and consequent bookings added!", HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<String>("Invalid date format", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/shift/remove")
    public ResponseEntity<String> removeShift(@RequestBody Map<String, String> shiftDetails) {
        //remove all bookings
        //remove shift
        if (null == userService.findEmployeeDetailsByUsername(shiftDetails.get("username"))) {
            return new ResponseEntity<String>("Employee not found", HttpStatus.NOT_FOUND);
        }
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date desiredDate = new Date(dateFormat.parse(shiftDetails.get("shiftDate")).getTime());
            Calendar cal = Calendar.getInstance();

            boolean shiftFound = false;

            if (cal.getTime().after(desiredDate)) {
                return new ResponseEntity<String>("Cannot remove past shift", HttpStatus.BAD_REQUEST);
            }

            Iterator<Shift> shiftIterator = shiftService.getAllShifts().iterator();
            while(shiftIterator.hasNext()) {
                Shift shift = shiftIterator.next();
                if (shift.getEmployeeUsername().equals(shiftDetails.get("username"))) {
                    if (shift.getShiftDate().compareTo(desiredDate) == 0) {
                        shiftService.removeShift(shift);
                        shiftFound = true;
                    }
                }
                shiftIterator.remove();
            }

            if (!shiftFound) {
                return new ResponseEntity<String>("Shift not found", HttpStatus.NOT_FOUND);
            }

            Iterator<Booking> bookingIterator = bookingService.getAllBookings().iterator();
            while(bookingIterator.hasNext()) {
                Booking booking = bookingIterator.next();
                if (booking.getEmployeeUsername().equals(shiftDetails.get("username"))) {
                    if (booking.getDate().compareTo(desiredDate) == 0) {
                        bookingService.removeBooking(booking);
                    }
                }
                bookingIterator.remove();
            }
            return new ResponseEntity<String>("Shift and bookings removed", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid date", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping(value="/shift/all")
    public ResponseEntity<List<Shift>> getAllShifts() {
        return new ResponseEntity<List<Shift>>(shiftService.getAllShifts(), HttpStatus.OK);
    }

    @GetMapping(value = "/shift/findAllByUsername/{username}")
    public ResponseEntity<?> getAllShiftsByUsername(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Shift>>(shiftService.getShiftsByUsername(username), HttpStatus.OK);
    }

    @GetMapping(value = "/shift/findFutureByUsername/{username}")
    public ResponseEntity<?> getFutureShiftsByUsername(@PathVariable("username") String username) {
        if (null == userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
        }

        List<Shift> desiredShifts = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        for (Shift shift : shiftService.getShiftsByUsername(username)) {
            if (shift.getShiftDate().after(cal.getTime())) {
                desiredShifts.add(shift);
            }
        }
        return new ResponseEntity<List<Shift>>(desiredShifts, HttpStatus.OK);
    }

    @GetMapping(value = "shift/getAvailableEmployees/{date}")
    public ResponseEntity<?> getAvailableEmployeesOnDay(@PathVariable("date") String date) throws Exception{

        List<Map<String,String>> availableEmployees = new ArrayList<Map<String,String>>();

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date tempDate = new Date(dateFormat.parse(date).getTime());
            DayOfWeek dateDayOfWeek = shiftService.returnDayOfWeekFromDate(tempDate);

            for (EmployeeDetails tempEmployeeDetails : userService.getAllEmployeeDetails()) {
                for (DayOfWeek dow : tempEmployeeDetails.getAvailability()) {
                    if (dow.equals(dateDayOfWeek)) {
                        Map<String, String> tempEmployee = new HashMap<String, String>();
                        tempEmployee.put("username", tempEmployeeDetails.getUsername());
                        tempEmployee.put("name", tempEmployeeDetails.getName());
                        availableEmployees.add(tempEmployee);
                    }
                }
            }

            for (Shift tempShift : shiftService.getShiftsByDate(tempDate)) {
                availableEmployees.removeIf(employee -> tempShift.getEmployeeUsername().equals(employee.get("username")));
            }

            return new ResponseEntity<List<Map<String,String>>>(availableEmployees, HttpStatus.OK);

        }
        catch (Exception e) {
            return new ResponseEntity<String>("Invalid date", HttpStatus.BAD_REQUEST);
        }
    }
}
